import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Search,
  BookOpen,
  Award,
  Globe,
  TrendingUp,
  Users,
  Database,
  Star,
  X,
  Filter,
  ChevronRight,
  ChevronLeft,
  Clock,
  DollarSign,
  AlertCircle,
  BarChart3,
  PieChart,
  Calendar,
  Building,
  ExternalLink,
  Zap,
  Target,
  Activity,
  Eye,
  ArrowUp,
  ArrowDown,
  Sparkles,
  BookMarked,
  GraduationCap,
  MapPin,
  Link as LinkIcon,
  Share2,
  Newspaper,
} from "lucide-react";

// Helper functions
const isValidValue = (value) => {
  return (
    value &&
    value !== "--disable--" &&
    value.trim() !== "" &&
    value.trim() !== "--disable--" &&
    !value.includes("--disable--")
  );
};

const getDisplayValue = (value, fallback = "Tidak tersedia") => {
  if (
    !value ||
    value === "--disable--" ||
    value.includes("--disable--") ||
    value.trim() === "" ||
    value.trim() === "--disable--"
  ) {
    return fallback;
  }
  return value;
};

// 1. Hero Section Component
const HeroSection = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
            <h1 className="text-red-800 text-5xl md:text-6xl font-bold">
              OPEN
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
                SINTA
              </span>
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse delay-500" />
          </div>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Platform terdepan untuk mengeksplorasi jurnal akademik Indonesia
            dengan
            <span className="text-yellow-300 font-semibold">
              {" "}
              analitik mendalam
            </span>{" "}
            dan
            <span className="text-green-300 font-semibold">
              {" "}
              informasi pengindeksan terlengkap
            </span>
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative group flex items-center rounded-2xl bg-white shadow-2xl transition-all duration-300 hover:shadow-blue-200/50 focus-within:ring-4 focus-within:ring-blue-300">
              {/* Search Icon */}
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-blue-600 transition-colors duration-200 z-10"
                aria-hidden="true"
              />

              {/* Search Input */}
              <input
                type="text"
                placeholder="Cari jurnal berdasarkan nama, institusi, ISSN, atau bidang studi..."
                className="w-full pl-12 pr-32 sm:pr-36 py-4 text-lg rounded-2xl bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Cari jurnal"
              />

              {/* Clear Button (visible only when searchTerm exists) */}
              {searchTerm && searchTerm.trim() !== "" && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-24 sm:right-28 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 z-20"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Search Button */}
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center z-10"
                aria-label="Cari jurnal"
              >
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm sm:text-base">Cari</span>
              </button>
            </div>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              {
                key: "all",
                label: "Semua",
                icon: <Database className="w-4 h-4" />,
              },
              {
                key: "scopus",
                label: "Scopus",
                icon: <Globe className="w-4 h-4" />,
              },
              {
                key: "sinta",
                label: "SINTA",
                icon: <Award className="w-4 h-4" />,
              },
              {
                key: "garuda",
                label: "Garuda",
                icon: <BookOpen className="w-4 h-4" />,
              },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  selectedFilter === filter.key
                    ? "bg-white text-blue-600 shadow-lg transform scale-105"
                    : "bg-blue-500 bg-opacity-20 text-white hover:bg-opacity-30 hover:scale-105"
                }`}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Pencarian Lanjutan</span>
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Trending Topics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// 2. Quick Stats Component
const QuickStats = ({ stats, loading }) => {
  const quickStats = [
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      label: "Total Jurnal",
      value: loading ? "..." : stats.totalJournals.toLocaleString(),
      color: "bg-blue-50 border-blue-200",
      trend: "+12%",
      trendIcon: <ArrowUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      label: "Terindeks Scopus",
      value: loading ? "..." : stats.scopusIndexed.toLocaleString(),
      color: "bg-green-50 border-green-200",
      trend: "+8%",
      trendIcon: <ArrowUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      label: "Terakreditasi SINTA",
      value: loading ? "..." : stats.sintaAccredited.toLocaleString(),
      color: "bg-yellow-50 border-yellow-200",
      trend: "+15%",
      trendIcon: <ArrowUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      label: "Terindeks Garuda",
      value: loading ? "..." : stats.garudaIndexed.toLocaleString(),
      color: "bg-purple-50 border-purple-200",
      trend: "+5%",
      trendIcon: <ArrowUp className="w-4 h-4 text-green-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-6 rounded-2xl border-2 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <div className="flex items-center space-x-1">
                    {stat.trendIcon}
                    <span className="text-xs font-semibold text-green-600">
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 rounded-full bg-white shadow-md group-hover:shadow-lg transition-shadow">
                {stat.icon}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full transition-all duration-1000"
                style={{ width: `${70 + index * 10}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Journal Card Component
const JournalCard = ({ journal, index }) => {
  const handleWebsiteClick = () => {
    try {
      const website =
        journal["Website URL"] || journal["URL"] || journal["Link"];
      if (
        website &&
        website !== "--disable--" &&
        !website.includes("--disable--")
      ) {
        let url = website.trim();
        // Add protocol if missing
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = `https://${url}`;
        }
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        alert("Website tidak tersedia untuk jurnal ini");
      }
    } catch (error) {
      console.error("Error opening website:", error);
      alert("Gagal membuka website");
    }
  };

  const handleShareClick = () => {
    try {
      const journalName = getDisplayValue(journal["Nama Jurnal"], "Jurnal");
      const shareText = `Lihat jurnal: ${journalName} di Open SINTA Platform`;
      const shareUrl =
        journal["Website URL"] || journal["URL"] || journal["Link"];

      if (navigator.share) {
        navigator
          .share({
            title: journalName,
            text: shareText,
            url: shareUrl,
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              console.log("Error sharing:", err);
            }
          });
      } else {
        // Fallback to clipboard
        const textToCopy = `${shareText} - ${shareUrl}`;
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => alert("Link berhasil disalin ke clipboard!"))
          .catch((err) => {
            console.error("Failed to copy:", err);
            alert("Gagal menyalin link");
          });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Gagal membagikan jurnal");
    }
  };

  const handleSintaProfileClick = () => {
    try {
      const sintaId =
        journal["SINTA ID"] || journal["Sinta ID"] || journal["ID SINTA"];
      const issn = journal["E-ISSN"] || journal["P-ISSN"];

      if (
        sintaId &&
        sintaId !== "--disable--" &&
        !sintaId.includes("--disable--")
      ) {
        // If we have direct SINTA ID
        const sintaUrl = `https://sinta.kemdikbud.go.id/journals/profile/${sintaId}`;
        window.open(sintaUrl, "_blank", "noopener,noreferrer");
      } else if (
        issn &&
        issn !== "--disable--" &&
        !issn.includes("--disable--")
      ) {
        // Use ISSN to search in SINTA
        const searchUrl = `https://sinta.kemdikbud.go.id/journals?q=${encodeURIComponent(
          issn
        )}`;
        window.open(searchUrl, "_blank", "noopener,noreferrer");
      } else {
        // Use journal name to search
        const journalName = getDisplayValue(journal["Nama Jurnal"], "");
        if (journalName) {
          const searchUrl = `https://sinta.kemdikbud.go.id/journals?q=${encodeURIComponent(
            journalName
          )}`;
          window.open(searchUrl, "_blank", "noopener,noreferrer");
        } else {
          alert("Informasi untuk mencari profil SINTA tidak tersedia");
        }
      }
    } catch (error) {
      console.error("Error opening SINTA profile:", error);
      alert("Gagal membuka profil SINTA");
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group bg-gradient-to-r from-white to-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start space-x-3 mb-3">
            <BookMarked className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
              {getDisplayValue(
                journal["Nama Jurnal"],
                "Nama Jurnal Tidak Tersedia"
              )}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">
                P-ISSN:{" "}
                <span className="font-mono">
                  {getDisplayValue(journal["P-ISSN"], "N/A")}
                </span>
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">
                E-ISSN:{" "}
                <span className="font-mono">
                  {getDisplayValue(journal["E-ISSN"], "N/A")}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="flex-1">
              {getDisplayValue(journal["Afiliasi"], "Afiliasi tidak tersedia")}
            </span>
          </div>

          {isValidValue(journal["Subject Area"]) && (
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1">{journal["Subject Area"]}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 flex-wrap mb-4">
            {isValidValue(journal["Akreditasi Sinta"]) && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  journal["Akreditasi Sinta"].includes("S1")
                    ? "bg-green-100 text-green-800 border-green-300"
                    : journal["Akreditasi Sinta"].includes("S2")
                    ? "bg-blue-100 text-blue-800 border-blue-300"
                    : journal["Akreditasi Sinta"].includes("S3")
                    ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                    : journal["Akreditasi Sinta"].includes("S4")
                    ? "bg-orange-100 text-orange-800 border-orange-300"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                SINTA {journal["Akreditasi Sinta"]}
              </span>
            )}
            {journal["Scopus Indexed"] === "Yes" && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 border border-orange-300 rounded-full text-sm font-medium">
                Scopus Indexed
              </span>
            )}
            {journal["Garuda Indexed"] === "Yes" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 border border-purple-300 rounded-full text-sm font-medium">
                Garuda Indexed
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleWebsiteClick}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">Kunjungi Website</span>
            </button>
            <button
              onClick={handleSintaProfileClick}
              className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors"
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Profil SINTA</span>
            </button>
            <button
              onClick={handleShareClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Bagikan</span>
            </button>
          </div>
        </div>

        <div className="text-right ml-6">
          <div className="text-sm text-gray-500 mb-1">Impact Factor</div>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {journal.Impact || "N/A"}
          </div>
          {journal.Impact && (
            <div className="text-xs text-green-600 font-medium">
              <ArrowUp className="w-3 h-3 inline mr-1" />
              High Impact
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8 p-4 bg-gray-50 rounded-xl">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-50"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Sebelumnya</span>
      </button>

      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            if (totalPages <= 7) return true;
            if (page <= 2 || page >= totalPages - 1) return true;
            return Math.abs(page - currentPage) <= 1;
          })
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="text-gray-400">...</span>
              )}
              <button
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:bg-blue-50"
        }`}
      >
        <span>Selanjutnya</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// 5. Journal List Component
const JournalList = ({
  journals,
  loading,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalJournals,
  sortBy,
  onSortChange,
  onPageChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Star className="w-6 h-6 text-yellow-500 mr-2" />
          Jurnal Unggulan
          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            {totalJournals.toLocaleString()}
          </span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="impact">Impact Factor</option>
              <option value="name">Nama Jurnal</option>
              <option value="sinta">Akreditasi SINTA</option>
            </select>
          </div>
          <RouterLink
            to="/visualisasi"
            className="text-blue-600 hover:text-blue-800 flex items-center font-semibold group"
          >
            Lihat Semua
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">
            Menampilkan {startIndex + 1}-{Math.min(endIndex, totalJournals)}{" "}
            dari {totalJournals} jurnal
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </span>
        </div>
      </div>

      {/* Journal Cards */}
      <div className="space-y-6">
        {journals.map((journal, index) => (
          <JournalCard key={index} journal={journal} index={index} />
        ))}

        {journals.length === 0 && !loading && (
          <div className="text-center py-12">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Tidak ada jurnal yang ditemukan untuk kriteria sorting ini
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Coba ubah pilihan pengurutan atau filter
            </p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

// 6. Main Home Component
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [journalsData, setJournalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [stats, setStats] = useState({
    totalJournals: 0,
    scopusIndexed: 0,
    sintaAccredited: 0,
    garudaIndexed: 0,
  });
  const [sortBy, setSortBy] = useState("impact");

  // Load JSON data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}/sinta_journals.json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setJournalsData(data);

        // Calculate stats
        const totalJournals = data.length;
        const scopusIndexed = data.filter(
          (journal) => journal["Scopus Indexed"] === "Yes"
        ).length;
        const sintaAccredited = data.filter((journal) =>
          isValidValue(journal["Akreditasi Sinta"])
        ).length;
        const garudaIndexed = data.filter(
          (journal) => journal["Garuda Indexed"] === "Yes"
        ).length;

        setStats({
          totalJournals,
          scopusIndexed,
          sintaAccredited,
          garudaIndexed,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Reset currentPage when searchTerm or selectedFilter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  const getAllFeaturedJournals = () => {
    if (!journalsData || journalsData.length === 0) return [];

    let filteredJournals = [...journalsData];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filteredJournals = filteredJournals.filter((journal) => {
        const name = getDisplayValue(journal["Nama Jurnal"], "").toLowerCase();
        const issn = getDisplayValue(
          journal["E-ISSN"] || journal["P-ISSN"],
          ""
        ).toLowerCase();
        const affiliation = getDisplayValue(
          journal["Afiliasi"],
          ""
        ).toLowerCase();
        const subject = getDisplayValue(
          journal["Subject Area"],
          ""
        ).toLowerCase();

        return (
          name.includes(searchLower) ||
          issn.includes(searchLower) ||
          affiliation.includes(searchLower) ||
          subject.includes(searchLower)
        );
      });
    }

    // Apply index filter
    if (selectedFilter !== "all") {
      filteredJournals = filteredJournals.filter((journal) => {
        if (selectedFilter === "scopus") {
          return journal["Scopus Indexed"] === "Yes";
        }
        if (selectedFilter === "sinta") {
          return isValidValue(journal["Akreditasi Sinta"]);
        }
        if (selectedFilter === "garuda") {
          return journal["Garuda Indexed"] === "Yes";
        }
        return true;
      });
    }

    // Apply sorting
    let sortedJournals = filteredJournals;

    try {
      switch (sortBy) {
        case "impact":
          sortedJournals = filteredJournals
            .filter(
              (journal) => journal.Impact && !isNaN(parseFloat(journal.Impact))
            )
            .sort((a, b) => parseFloat(b.Impact) - parseFloat(a.Impact));
          break;
        case "name":
          sortedJournals = [...filteredJournals].sort((a, b) => {
            const nameA = getDisplayValue(a["Nama Jurnal"], "")
              .toLowerCase()
              .trim();
            const nameB = getDisplayValue(b["Nama Jurnal"], "")
              .toLowerCase()
              .trim();

            if (!nameA && !nameB) return 0;
            if (!nameA) return 1;
            if (!nameB) return -1;

            return nameA.localeCompare(nameB, "id-ID");
          });
          break;
        case "sinta":
          sortedJournals = filteredJournals
            .filter((journal) => isValidValue(journal["Akreditasi Sinta"]))
            .sort((a, b) => {
              const sintaA = a["Akreditasi Sinta"] || "S5";
              const sintaB = b["Akreditasi Sinta"] || "S5";
              return sintaA.localeCompare(sintaB);
            });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error in sorting:", error);
      return filteredJournals; // Return filtered data if error
    }

    return sortedJournals;
  };

  // Pagination logic
  const allFeaturedJournals = getAllFeaturedJournals();
  const totalPages = Math.ceil(allFeaturedJournals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJournals = allFeaturedJournals.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  // Calculate real subject area statistics from JSON data
  const getSubjectStats = () => {
    if (!journalsData || journalsData.length === 0)
      return { trending: [], categories: [] };

    // Count subjects
    const subjectCounts = {};
    journalsData.forEach((journal) => {
      const subject = journal["Subject Area"];
      if (isValidValue(subject)) {
        // Split multiple subjects (if separated by comma/semicolon)
        const subjects = subject
          .split(/[,;]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        subjects.forEach((subj) => {
          subjectCounts[subj] = (subjectCounts[subj] || 0) + 1;
        });
      }
    });

    // Sort by count and get top subjects
    const sortedSubjects = Object.entries(subjectCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const totalJournals = journalsData.length;

    // Generate trending topics (top 5 with random trend percentages)
    const trending = sortedSubjects.slice(0, 5).map(([subject, count]) => ({
      topic: subject,
      count,
      trend: `+${Math.floor(Math.random() * 20) + 5}%`,
    }));

    // Generate categories with percentages
    const categories = sortedSubjects
      .slice(0, 6)
      .map(([subject, count], index) => ({
        category: subject,
        count,
        percentage: Math.round((count / totalJournals) * 100),
        color:
          [
            "bg-blue-500",
            "bg-green-500",
            "bg-red-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-indigo-500",
          ][index] || "bg-gray-500",
      }));

    return { trending, categories };
  };

  const { trending, categories } = getSubjectStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <QuickStats stats={stats} loading={loading} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <JournalList
              journals={currentJournals}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalJournals={allFeaturedJournals.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="space-y-2 flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                          <div className="h-6 bg-gray-200 rounded w-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  trending.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.topic}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.count} jurnal
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {item.trend}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-5 h-5 text-purple-500 mr-2" />
                Kategori Populer
              </h3>
              <div className="space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="animate-pulse space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gray-300 h-2 rounded-full"
                            style={{ width: `${50 + index * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  categories.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {item.category}
                        </span>
                        <div className="text-right">
                          <span className="text-sm text-gray-600">
                            {item.percentage}%
                          </span>
                          <span className="text-xs text-gray-500 block">
                            ({item.count})
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Updates */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                Update Terbaru
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Launching OpenSINTA V1.0",
                    desc: "Platform OpenSINTA resmi diluncurkan dengan fitur baru.",
                    time: "19 Juli 2025",
                    icon: <Newspaper className="w-4 h-4 text-blue-600" />,
                  },
                ].map((update, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                      {update.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {update.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {update.desc}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {update.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                Akses Cepat
              </h3>
              <div className="space-y-3">
                <RouterLink
                  to="/visualisasi"
                  className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-medium">Analisis & Visualisasi</span>
                </RouterLink>
                <RouterLink
                  to="/kalkulasi"
                  className="flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium">
                    Kalkulator Biaya Publikasi
                  </span>
                </RouterLink>
                <RouterLink
                  to="/tutorial"
                  className="flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">Panduan Scrapping</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
