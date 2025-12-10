
export const DesignersSection = () => {
  const designers = [
    {
      name: "Viktoria Meszaros",
      specialty: "Modern & Minimalist",
      image: "/lovable-uploads/1c4cbb0c-6020-4364-979d-1044bca493f4.png"
    },
    {
      name: "Michael Chen",
      specialty: "Contemporary & Luxury",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      specialty: "Scandinavian & Sustainable",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-portal-dark mb-6 font-cinzel">
            Meet Our Designers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of expert designers brings years of experience and unique perspectives to every project.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {designers.map((designer, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <img 
                  src={designer.image} 
                  alt={designer.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-portal-dark mb-2">{designer.name}</h3>
              <p className="text-portal-sage font-medium">{designer.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
