from fastapi import FastAPI
from app.routes.pronunciation import router
from app.database import engine
from app.models import Base
from app.limiter import limiter
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiter
app.state.limiter = limiter

# Database
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(router)


# Rate limit handler
@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded"}
    )
