export const Info = () => {
  return (
    <div className=" px-2 md:px-0">
      <div className="max-w-[73rem] w-full mx-auto bg-gradient-to-r from-indigo-600 to-blue-400 rounded-[32px] text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl overflow-hidden">
        <div className="flex flex-col items-center md:items-start">
          <h1
            className="text-6xl font-serif font-bold text-white mb-4"
            style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
          >
            Relax & Rejuvenate
          </h1>
          <p className="text-xl font-light mb-4 text-white">
            Your sanctuary of luxury and wellness awaits. Experience tailored spa treatments,
            gourmet delights, and serene environments designed to soothe your soul.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-4 md:mt-0">
          <button className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Join & Earn Rewards
          </button>
          <button className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Book Now
          </button>
          <button className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Free Cancellation
          </button>
          <button className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Spa Packages
          </button>
          <button className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-full hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            24/7 Support
          </button>
        </div>
      </div>
    </div>
  );
};
