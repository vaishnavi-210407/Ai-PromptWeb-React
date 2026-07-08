// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 className="text-amber-400 font-display font-semibold mb-2">AutoVerse</h4>
          <p className="text-gray-400">Your trusted marketplace for new and premium cars.</p>
        </div>
        <div>
          <h4 className="text-gray-200 font-medium mb-2">Quick Links</h4>
          <ul className="text-gray-400 space-y-1">
            <li>About Us</li>
            <li>Contact</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-200 font-medium mb-2">Support</h4>
          <ul className="text-gray-400 space-y-1">
            <li>Help Center</li>
            <li>Warranty</li>
            <li>Returns</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs py-4 border-t border-navy-800">
        © {new Date().getFullYear()} AutoVerse. All rights reserved.
      </div>
    </footer>
  );
}