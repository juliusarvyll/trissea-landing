import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
        <FeatureBlock
          title="Book Your Ride in Seconds"
          description="Just open the app, set your pickup location, and get matched with a nearby tricycle driver instantly. No more waiting or haggling!"
          features={[
            "Real-time driver tracking",
            "Upfront fixed pricing"
            
          ]}
          imagePath="/images/feature1.png"
          imageAlt="Easy booking feature"
          reversed={false}
        />

        <FeatureBlock
          title="Your Safety is Our Priority"
          description="Travel with peace of mind knowing that all our drivers are verified and your rides are monitored."
          features={[
            "Verified drivers",
            "Regulated by Tricycle Regulation Unit",
            "Emergency assistance"
          ]}
          imagePath="/images/feature2.png"
          imageAlt="Safety feature"
          reversed={true}
        />
      </div>
    </section>
  );
}

function FeatureBlock({
  title,
  description,
  features,
  imagePath,
  imageAlt,
  reversed
}: {
  title: string;
  description: string;
  features: string[];
  imagePath: string;
  imageAlt: string;
  reversed: boolean;
}) {
  const content = (
    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mb-8 font-light lg:text-xl">{description}</p>
      <ul className="space-y-5 border-t border-gray-200 dark:border-gray-700 pt-8">
        {features.map((feature, index) => (
          <li key={index} className="flex space-x-3">
            <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const image = (
    <div className="flex justify-center items-center">
      <div className="relative w-[280px] h-[560px] rounded-[3rem] border-8 border-gray-900 overflow-hidden shadow-xl">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-32 bg-gray-900 rounded-b-xl z-10"></div>
        <Image
          className="w-full h-full object-cover"
          src={imagePath}
          alt={imageAlt}
          width={280}
          height={560}
          priority
        />
      </div>
    </div>
  );

  return (
    <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
      {reversed ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
} 