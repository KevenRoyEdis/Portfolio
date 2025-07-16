import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Briefcase, Mail, Phone, MapPin, Calendar, Users, Code, Monitor, Facebook, Send, Github, X } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileImage] = useState<string>('/profile-photo.jpg');
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
  const [zoomedSocial, setZoomedSocial] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Social media links
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/keven.edis28',
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/KevenRoyEdis',
      color: 'hover:text-gray-800'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: 'https://t.me/kevs17',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Gmail',
      icon: Mail,
      url: 'mailto:kevenroy.edis17@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  // Create audio context for click sounds
  const playClickSound = (): void => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio context not supported');
    }
  };

  const handleSectionClick = (section: string): void => {
    playClickSound();
    setActiveSection(section);
  };

  const handleImageClick = (): void => {
    playClickSound();
    setIsImageZoomed(true);
  };

  const handleSocialClick = (e: React.MouseEvent, socialName: string, url: string): void => {
    e.preventDefault();
    playClickSound();
    setZoomedSocial(socialName);
    
    // Auto-close zoom after 2 seconds and redirect
    setTimeout(() => {
      setZoomedSocial(null);
      window.open(url, '_blank');
    }, 2000);
  };

  const closeZoom = (): void => {
    setIsImageZoomed(false);
    setZoomedSocial(null);
  };

  // Zoom Modal Component
  const ZoomModal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={closeZoom}
    >
      <div 
        className="relative max-w-4xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeZoom}
          className="absolute right-0 text-white transition-colors -top-12 hover:text-gray-300"
        >
          <X size={32} />
        </button>
        {children}
      </div>
    </div>
  );

  const PersonalInfo: React.FC = () => (
    <div className={`transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col items-center mb-6 md:flex-row">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Keven Roy C. Edis" 
                className="object-cover w-32 h-32 transition-all duration-300 transform border-4 border-blue-200 rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:scale-105"
                onClick={handleImageClick}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            
            {/* Fallback initials */}
            <div 
              className={`w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-blue-200 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${profileImage ? 'hidden' : ''}`}
              onClick={handleImageClick}
            >
              KE
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="mb-2 text-4xl font-bold text-gray-800">Keven Roy C. Edis</h1>
            <p className="mb-4 text-xl font-semibold text-blue-600">Computer Engineering Graduate</p>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-4 md:justify-start">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={(e) => handleSocialClick(e, social.name, social.url)}
                  className={`p-2 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 transform hover:scale-110 hover:bg-gray-200 ${social.color} cursor-pointer`}
                  title={social.name}
                >
                  <social.icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Professional Summary */}
        <div className="p-6 mb-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h3 className="flex items-center mb-3 text-xl font-semibold text-gray-800">
            <Briefcase className="mr-3 text-blue-500" size={20} />
            Professional Summary
          </h3>
          <p className="leading-relaxed text-gray-700">
            Detail-oriented and highly organized Virtual Assistant with experience in social media management, administrative support, and client coordination. Skilled in executing digital strategies, managing content calendars, and delivering executive assistance with professionalism. Committed to supporting premium and luxury brand clients with integrity and efficiency.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="mr-3 text-blue-500" size={20} />
              <span>Born September 28, 2001 (23 years old)</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-3 text-blue-500" size={20} />
              <span>Icdang Village, Poblacion, Kidapawan City</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="mr-3 text-blue-500" size={20} />
              <span>09383150900</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="mr-3 text-blue-500" size={20} />
              <span>kevenroy.edis17@gmail.com</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <User className="mr-3 text-blue-500" size={20} />
              <span>Single • Male • Roman Catholic</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Code className="mr-3 text-blue-500" size={20} />
              <span>Computer Literate</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Monitor className="mr-3 text-blue-500" size={20} />
              <span>Nickname: Kevs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Education: React.FC = () => (
    <div className={`transform transition-all duration-500 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
        <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
          <GraduationCap className="mr-3 text-blue-500" />
          Education
        </h2>
        
        <div className="space-y-6">
          <div className="p-4 pl-6 transition-colors duration-300 border-l-4 border-blue-500 rounded-r-lg hover:bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-800">Bachelor of Science in Computer Engineering</h3>
            <p className="font-medium text-blue-600">Colegio de Kidapawan</p>
            <p className="text-gray-600">Quezon Blvd, 9400 Kidapawan</p>
            <p className="text-gray-600">2020-2025 (Graduated)</p>
          </div>
          
          <div className="p-4 pl-6 transition-colors duration-300 border-l-4 border-green-500 rounded-r-lg hover:bg-green-50">
            <h3 className="text-xl font-semibold text-gray-800">Secondary Education</h3>
            <p className="font-medium text-green-600">Spottswood National High School</p>
            <p className="text-gray-600">Mt. Apo Village, Poblacion, Kidapawan City</p>
            <p className="text-gray-500">2014-2020</p>
          </div>
          
          <div className="p-4 pl-6 transition-colors duration-300 border-l-4 border-purple-500 rounded-r-lg hover:bg-purple-50">
            <h3 className="text-xl font-semibold text-gray-800">Elementary Education</h3>
            <p className="font-medium text-purple-600">Kidapawan City Pilot Elementary School</p>
            <p className="text-gray-600">JP Laurel Street, Poblacion, Kidapawan City</p>
            <p className="text-gray-500">2008-2014</p>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkExperience: React.FC = () => (
    <div className={`transform transition-all duration-500 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
        <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
          <Briefcase className="mr-3 text-blue-500" />
          Work Experience
        </h2>
        
        <div className="space-y-6">
          <div className="p-4 pl-6 transition-colors duration-300 border-l-4 border-blue-500 rounded-r-lg hover:bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-800">V.A Social Media Manager</h3>
            <p className="font-medium text-blue-600">Outsourced</p>
            <p className="text-gray-500">February 2024 - April 2025</p>
            <p className="mt-2 text-gray-600">Managed social media accounts and virtual assistance tasks for various clients.</p>
          </div>
          
          <div className="p-4 pl-6 transition-colors duration-300 border-l-4 border-green-500 rounded-r-lg hover:bg-green-50">
            <h3 className="text-xl font-semibold text-gray-800">On the Job Training</h3>
            <p className="font-medium text-green-600">Cotabato Electric Cooperative</p>
            <p className="mt-2 text-gray-600">Gained hands-on experience in electrical systems and cooperative operations.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const References: React.FC = () => (
    <div className={`transform transition-all duration-500 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
        <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
          <Users className="mr-3 text-blue-500" />
          References
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">Michelle Joy B. Damansila</h3>
            <p className="font-medium text-blue-600">Teacher</p>
            <p className="text-gray-600">Bubong Elementary School</p>
            <p className="text-gray-600">Cotabato City</p>
            <p className="mt-2 text-gray-500">09092046154</p>
          </div>
          
          <div className="p-6 transition-shadow duration-300 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">Chris Abegail Rumay</h3>
            <p className="font-medium text-green-600">Customer Support</p>
            <p className="text-gray-600">Billing and Technical</p>
            <p className="text-gray-600">Quimpo Boulevard, Davao City</p>
            <p className="mt-2 text-gray-500">09916140859</p>
          </div>
          
          <div className="p-6 transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">Christopher Casabuena</h3>
            <p className="font-medium text-purple-600">Bagger</p>
            <p className="text-gray-600">Gaisano Grand Mall</p>
            <p className="text-gray-600">Lanao, Kidapawan City</p>
            <p className="mt-2 text-gray-500">09700812869</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = (): React.ReactNode => {
    switch (activeSection) {
      case 'about':
        return <PersonalInfo />;
      case 'education':
        return <Education />;
      case 'experience':
        return <WorkExperience />;
      case 'references':
        return <References />;
      default:
        return <PersonalInfo />;
    }
  };

  const navigationSections: Section[] = [
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'references', label: 'References', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-lg">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Keven Roy C. Edis" 
                  className="object-cover w-12 h-12 mr-3 transition-all duration-300 transform border-2 border-blue-200 rounded-full cursor-pointer hover:shadow-lg hover:scale-105"
                  onClick={handleImageClick}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div 
                className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${profileImage ? 'hidden' : ''}`}
                onClick={handleImageClick}
              >
                KE
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Keven Roy C. Edis</h1>
            </div>
            
            <div className="flex space-x-1">
              {navigationSections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleSectionClick(id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 ${
                    activeSection === id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl px-4 py-8 mx-auto">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="py-8 text-white bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <div className="flex justify-center mb-4 space-x-6">
            <div className="flex items-center">
              <Phone className="mr-2" size={18} />
              <span>09383150900</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2" size={18} />
              <span>kevenroy.edis17@gmail.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" size={18} />
              <span>Kidapawan City</span>
            </div>
          </div>
          
          {/* Footer Social Links */}
          <div className="flex justify-center mb-4 space-x-4">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                onClick={(e) => handleSocialClick(e, social.name, social.url)}
                className="p-2 text-gray-300 transition-all duration-300 transform bg-gray-700 rounded-full hover:bg-gray-600 hover:text-white hover:scale-110"
                title={social.name}
              >
                <social.icon size={18} />
              </button>
            ))}
          </div>
          
          <p className="text-gray-400">© 2025 Keven Roy C. Edis. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Animation Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-20 left-10 animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-purple-400 rounded-full top-40 right-20 animate-bounce"></div>
        <div className="absolute w-2 h-2 bg-pink-400 rounded-full bottom-40 left-20 animate-ping"></div>
        <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-20 right-10 animate-pulse"></div>
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed && (
        <ZoomModal>
          <div className="animate-pulse">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Keven Roy C. Edis - Zoomed" 
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
            ) : (
              <div className="flex items-center justify-center font-bold text-white rounded-lg shadow-2xl w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 text-8xl">
                KE
              </div>
            )}
          </div>
        </ZoomModal>
      )}

      {/* Social Media Zoom Modal */}
      {zoomedSocial && (
        <ZoomModal>
          <div className="flex flex-col items-center animate-bounce">
            {socialLinks.map((social) => {
              if (social.name === zoomedSocial) {
                return (
                  <div key={social.name} className="text-center">
                    <div className="flex items-center justify-center w-32 h-32 mb-4 bg-white rounded-full shadow-2xl">
                      <social.icon size={64} className="text-gray-700" />
                    </div>
                    <p className="text-xl font-semibold text-white">Opening {social.name}...</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </ZoomModal>
      )}
    </div>
  );
};

export default Portfolio;