export default function Ourplans() {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "99 EGP",
      period: "/ month",
      description:
        "Perfect for casual movie lovers who want a simple and affordable experience.",
      features: [
        "Access to trending movies",
        "Basic movie search",
        "Add to watchlist",
        "Standard browsing experience",
      ],
      highlighted: false,
      buttonText: "Choose Basic",
    },
    {
      id: 2,
      name: "Standard",
      price: "199 EGP",
      period: "/ month",
      description:
        "Best option for most users with more features and a better movie discovery experience.",
      features: [
        "Everything in Basic",
        "Advanced discover filters",
        "Priority access to new features",
        "Enhanced movie details experience",
      ],
      highlighted: true,
      buttonText: "Choose Standard",
    },
    {
      id: 3,
      name: "Premium",
      price: "299 EGP",
      period: "/ month",
      description:
        "For movie enthusiasts who want the full SCN experience with all premium features.",
      features: [
        "Everything in Standard",
        "Premium watchlist experience",
        "Exclusive future features",
        "Full personalized experience",
      ],
      highlighted: false,
      buttonText: "Choose Premium",
    },
  ];

  return (
    <section className="w-full px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-white text-3xl font-bold mb-2">Our Plans</h2>
        <p className="text-secondF max-w-2xl mx-auto">
          Choose the plan that fits your movie journey and enjoy the best SCN
          experience.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-6 bg-card border transition duration-300 flex flex-col ${
              plan.highlighted
                ? "border-buttn shadow-xl shadow-black/40 scale-[1.04] -translate-y-4 z-10"
                : "border-white/10"
            }`}
          >
            {/* Badge */}
            {plan.highlighted && (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-buttn text-white w-fit">
                Most Popular
              </span>
            )}

            {/* Title */}
            <h3 className="text-white text-2xl font-bold mb-2">{plan.name}</h3>

            {/* Price */}
            <div className="mb-4">
              <span className="text-[#24bf86] text-3xl font-extrabold">
                {plan.price}
              </span>
              <span className="text-secondF text-sm ml-1">{plan.period}</span>
            </div>

            {/* Description */}
            <p className="text-secondF text-sm leading-6 mb-6">
              {plan.description}
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-white/90 text-sm leading-6 flex items-start gap-2"
                >
                  <i className="bi bi-check-circle-fill text-[#18af78] mt-1"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`w-full py-3 rounded-xl font-semibold transition mt-auto ${
                plan.highlighted
                  ? "bg-btn-gradient hover:bg-btn-gradient-hover text-white"
                  : "border border-white/10 text-white hover:bg-white/5"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}