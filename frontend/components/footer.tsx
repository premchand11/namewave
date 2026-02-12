export function Footer() {
  return (
    <footer className="border-t mt-12 sm:mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">
        
        {/* Top Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-center"> */}
        <div className="flex justify-center text-center">
          
          {/* Brand */}
          {/* <div>
            <h3 className="text-lg font-bold">NameWave</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Generate natural, professional name pronunciations in seconds.
            </p>
          </div> */}

          {/* Product */}
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Voices (coming soon)</li>
              <li>Pricing (Coming Soon)</li>
              <li>API Access (Coming Soon)</li>
            </ul>
          </div>

          {/* Company */}
          {/* <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div> */}

        </div>

        {/* Bottom Section */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
  {/* © {new Date().getFullYear()} NameWave. All rights reserved. */}
  <div className="mt-2">
    Made with ❤️ by{" "}
    <a
      href="https://aquarium-chi.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-foreground hover:underline transition"
    >
      Premchand
    </a>
  </div>
</div>

      </div>
    </footer>
  );
}
