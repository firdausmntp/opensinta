import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Sparkles,
  Star,
  Zap,
  Bell,
  CheckCircle,
  Mail,
  ArrowRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Lightbulb,
  Rocket,
} from "lucide-react";

const Kalkulator = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const calculatorFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Impact Factor Predictor",
      description: "Prediksi impact factor jurnal berdasarkan berbagai metrik",
      status: "In Development",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Citation Calculator",
      description: "Hitung potensi sitasi dan h-index dari publikasi",
      status: "Coming Soon",
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Journal Ranking Tool",
      description: "Evaluasi ranking jurnal berdasarkan multiple criteria",
      status: "Planned",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Research Performance",
      description: "Analisis performa penelitian dan rekomendasi improvement",
      status: "Planned",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header Section */}
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                <Calculator className="w-16 h-16 text-white mx-auto relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-bounce">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-gray-800">Smart</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Calculator
              </span>
              <span className="block text-gray-600 text-2xl md:text-3xl mt-2 font-medium">
                Tools
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8"
            >
              Sedang mengembangkan
              <span className="text-blue-600 font-semibold">
                {" "}
                tools kalkulator canggih
              </span>{" "}
              untuk membantu analisis akademik, prediksi impact factor, dan
              evaluasi performa penelitian Anda.
            </motion.p>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full font-semibold shadow-lg border border-blue-200"
            >
              <Rocket className="w-5 h-5 animate-bounce" />
              <span>In Active Development</span>
            </motion.div>
          </div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {calculatorFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {feature.description}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                        feature.status === "In Development"
                          ? "bg-yellow-100 text-yellow-800"
                          : feature.status === "Coming Soon"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          feature.status === "In Development"
                            ? "bg-yellow-400 animate-pulse"
                            : feature.status === "Coming Soon"
                            ? "bg-blue-400 animate-pulse"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      {feature.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Development Progress
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { label: "Research & Planning", progress: 100, color: "green" },
                { label: "Core Development", progress: 65, color: "blue" },
                { label: "Testing & Launch", progress: 20, color: "purple" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {item.progress}%
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{item.label}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        item.color === "green"
                          ? "from-green-400 to-green-600"
                          : item.color === "blue"
                          ? "from-blue-400 to-blue-600"
                          : "from-purple-400 to-purple-600"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-gray-600">
              <strong>Expected Launch:</strong> Q3 2025
            </div>
          </motion.div>

          {/* Notification Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Get Notified</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Jadilah yang pertama tahu ketika calculator tools sudah siap
              digunakan!
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Masukkan email Anda"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg"
                  >
                    <Bell className="w-5 h-5" />
                    <span>Notify Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-100 border border-green-200 rounded-xl p-6 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center space-x-3 text-green-700">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">Berhasil berlangganan!</span>
                </div>
                <p className="text-green-600 mt-2 text-center">
                  Kami akan memberitahu Anda ketika calculator tools sudah
                  launch.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Kalkulator;
