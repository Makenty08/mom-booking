import Image from 'next/image';

export const Card = () => {
  return (
    <div className="max-w-sm w-full rounded-[32px] overflow-hidden shadow-xl my-2 bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300 p-4 hover:saturate-200 hover:scale-100">
      <Image
        className="w-full object-cover h-48 rounded-[32px]"
        src="/static/HomeImage.svg"
        alt="Sheraton Hotel"
        width={400}
        height={192}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2 text-gray-800">Sheraton</div>
        <p className="text-gray-600 text-base">KZ, Astana</p>
        <div className="my-2">
          <span className="inline-block bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">
            40km
          </span>
          <span className="inline-block bg-green-300 rounded-full px-3 py-1 text-sm font-semibold text-green-800 mr-2 mb-2">
            5 Stars
          </span>
        </div>
      </div>
      <div className="px-6">
        <span className="inline-block bg-yellow-500 rounded-full px-3 py-1 text-sm font-semibold text-yellow-900 mr-2 mb-2">
          $400 / night
        </span>
      </div>
    </div>
  );
};
