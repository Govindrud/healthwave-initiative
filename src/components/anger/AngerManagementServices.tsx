
import React from "react";

const packages = [
  {
    name: "Introductory Session",
    description: "A 45-minute personal session to evaluate your triggers and create an anger management plan.",
    price: 999,
    image: "/images/products/selfcare-box.jpg"
  },
  {
    name: "3-Session Bundle",
    description: "Three 45-minute in-depth therapy sessions with actionable techniques for anger control.",
    price: 2699,
    image: "/images/products/sleep-mask.jpg"
  },
  {
    name: "Ongoing Monthly Support",
    description: "Unlimited messaging + 4 video sessions a month with our anger management specialist.",
    price: 5499,
    image: "/images/products/sound-machine.jpg"
  },
];

export default function AngerManagementServices() {
  return (
    <section className="my-14">
      <h2 className="text-2xl font-semibold text-center text-[#7E69AB] mb-8">Anger Management Service Packages</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {packages.map(pkg => (
          <div key={pkg.name} className="bg-white shadow rounded-lg flex flex-col items-center p-6">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-32 h-32 object-cover rounded-full border-2 border-[#9b87f5] mb-4"
              onError={e => ((e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Anger+Mgmt')}
            />
            <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
            <p className="text-center text-sm text-gray-600 mb-3">{pkg.description}</p>
            <span className="bg-[#e5deff] text-[#1A1F2C] px-4 py-2 rounded font-bold text-md mt-auto">
              ₹{pkg.price.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <a href="/doctors">
          <button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Book a Session
          </button>
        </a>
      </div>
    </section>
  );
}
