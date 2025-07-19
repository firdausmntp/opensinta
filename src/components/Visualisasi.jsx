import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  Award,
  Globe,
  BookOpen,
  Filter,
  Download,
  Eye,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Egg,
  FileText,
  Users,
} from "lucide-react";

const Visualisasi = () => {
  const [jsonData, setJsonData] = useState(null);
  const [activeChart, setActiveChart] = useState("overview");
  const [filteredData, setFilteredData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccreditation, setSelectedAccreditation] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const loadDataFromFile = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await fetch("/sinta_journals.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJsonData(data);
      setFilteredData(data);
      console.log("Data loaded successfully:", data.length, "journals");
    } catch (error) {
      console.error("Error loading data:", error);
      setLoadError(`Error loading data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromFile();
  }, []);

  const applyFilters = () => {
    if (!jsonData) return;

    let filtered = jsonData.filter((item) => {
      const matchesSearch =
        item["Nama Jurnal"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["Subject Area"]
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item["Afiliasi"]?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAccreditation =
        selectedAccreditation === "all" ||
        item["Akreditasi Sinta"]?.includes(selectedAccreditation);

      return matchesSearch && matchesAccreditation;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedAccreditation, jsonData]);

  // Pagination calculations
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData?.slice(startIndex, endIndex) || [];

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Enhanced data processing functions
  const getAccreditationData = () => {
    if (!filteredData) return [];

    const accreditation = {};
    filteredData.forEach((item) => {
      const acc = item["Akreditasi Sinta"] || "Not Specified";
      accreditation[acc] = (accreditation[acc] || 0) + 1;
    });

    return Object.entries(accreditation).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getSintaLevelData = () => {
    if (!filteredData) return [];

    const sintaLevels = {
      S1: 0,
      S2: 0,
      S3: 0,
      S4: 0,
      S5: 0,
      S6: 0,
      Other: 0,
    };

    filteredData.forEach((item) => {
      const akreditasi = item["Akreditasi Sinta"] || "";
      let found = false;

      for (let level of ["S1", "S2", "S3", "S4", "S5", "S6"]) {
        if (akreditasi.includes(level)) {
          sintaLevels[level]++;
          found = true;
          break;
        }
      }

      if (!found) {
        sintaLevels["Other"]++;
      }
    });

    return Object.entries(sintaLevels)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));
  };

  const getSubjectAreaData = () => {
    if (!filteredData) return [];

    const subjects = {};
    filteredData.forEach((item) => {
      const areas = item["Subject Area"]?.split(", ") || ["Other"];
      areas.forEach((area) => {
        subjects[area.trim()] = (subjects[area.trim()] || 0) + 1;
      });
    });

    return Object.entries(subjects)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const getImpactData = () => {
    if (!filteredData) return [];

    return filteredData
      .filter(
        (item) => item.Impact && parseFloat(item.Impact?.replace(",", "."))
      )
      .map((item) => ({
        name: item["Nama Jurnal"]?.substring(0, 25) + "...",
        fullName: item["Nama Jurnal"],
        impact: parseFloat(item.Impact?.replace(",", ".") || 0),
        citations: parseInt(item.Citations?.replace(/[.,]/g, "") || 0),
        h5Index: parseInt(item["H5-index"] || 0),
      }))
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 15);
  };

  const getScopusIndexingData = () => {
    if (!filteredData) return [];

    const scopus = { Yes: 0, No: 0 };
    filteredData.forEach((item) => {
      const indexed = item["Scopus Indexed"] || "No";
      scopus[indexed]++;
    });

    return Object.entries(scopus).map(([name, value]) => ({ name, value }));
  };

  const getGarudaIndexingData = () => {
    if (!filteredData) return [];

    const garuda = { Yes: 0, No: 0 };
    filteredData.forEach((item) => {
      const indexed = item["Garuda Indexed"] || "No";
      garuda[indexed]++;
    });

    return Object.entries(garuda).map(([name, value]) => ({ name, value }));
  };

  const getTopInstitutions = () => {
    if (!filteredData) return [];

    const institutions = {};
    filteredData.forEach((item) => {
      const afiliasi = item["Afiliasi"] || "Unknown";
      institutions[afiliasi] = (institutions[afiliasi] || 0) + 1;
    });

    return Object.entries(institutions)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#EC4899",
    "#14B8A6",
  ];

  const charts = [
    { id: "overview", label: "Ringkasan", icon: BarChart3 },
    { id: "accreditation", label: "Akreditasi", icon: Award },
    { id: "subjects", label: "Bidang Subjek", icon: BookOpen },
    { id: "impact", label: "Faktor Dampak", icon: TrendingUp },
    { id: "indexing", label: "Pengindeksan", icon: Globe },
    { id: "institutions", label: "Institusi", icon: Users },
  ];

  const exportData = () => {
    if (!filteredData) return;

    const dataStr = JSON.stringify(filteredData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_journals_data.json";
    link.click();
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visualisasi Data Jurnal SINTA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analisis dan visualisasi data jurnal ilmiah Indonesia berdasarkan
            data SINTA
          </p>
        </motion.div>

        {/* Data Loading Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-600" size={24} />
                <span className="font-medium text-gray-700">
                  Sumber Data: public/sinta_journals.json
                </span>
              </div>
              <button
                onClick={loadDataFromFile}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={isLoading ? "animate-spin" : ""}
                />
                Muat Ulang Data
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye size={16} />
              Data termuat: {formatNumber(filteredData?.length || 0)} jurnal
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">
                Memuat data dari public/sinta_journals.json...
              </span>
            </div>
          )}

          {/* Error State */}
          {loadError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <span className="font-medium">Error:</span>
                <span>{loadError}</span>
              </div>
              <p className="text-sm text-red-600 mt-2">
                Pastikan file 'sinta_journals.json' ada di folder public dan
                berisi data JSON yang valid.
              </p>
            </div>
          )}
        </motion.div>

        {/* Only show the rest of the component if data is loaded */}
        {filteredData && filteredData.length > 0 && (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="text-gray-600" size={20} />
                  <span className="font-medium text-gray-700">Filter:</span>
                </div>

                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Cari jurnal, subjek, atau afiliasi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={selectedAccreditation}
                    onChange={(e) => setSelectedAccreditation(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Semua Akreditasi</option>
                    <option value="S1">Akreditasi S1</option>
                    <option value="S2">Akreditasi S2</option>
                    <option value="S3">Akreditasi S3</option>
                    <option value="S4">Akreditasi S4</option>
                    <option value="S5">Akreditasi S5</option>
                    <option value="S6">Akreditasi S6</option>
                  </select>

                  <button
                    onClick={exportData}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download size={16} />
                    Ekspor
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Chart Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {charts.map((chart) => {
                  const Icon = chart.icon;
                  return (
                    <button
                      key={chart.id}
                      onClick={() => setActiveChart(chart.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeChart === chart.id
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow"
                      }`}
                    >
                      <Icon size={18} />
                      {chart.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Charts */}
            <motion.div
              key={activeChart}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              {activeChart === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Dasbor Ringkasan
                  </h2>

                  {/* Enhanced Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">
                            Total Jurnal
                          </p>
                          <p className="text-2xl font-bold text-blue-800">
                            {formatNumber(filteredData?.length || 0)}
                          </p>
                        </div>
                        <BookOpen className="text-blue-600" size={32} />
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">
                            S1 Accredited
                          </p>
                          <p className="text-2xl font-bold text-green-800">
                            {formatNumber(
                              filteredData?.filter((item) =>
                                item["Akreditasi Sinta"]?.includes("S1")
                              ).length || 0
                            )}
                          </p>
                        </div>
                        <Award className="text-green-600" size={32} />
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 text-sm font-medium">
                            Terindeks Scopus
                          </p>
                          <p className="text-2xl font-bold text-purple-800">
                            {formatNumber(
                              filteredData?.filter(
                                (item) => item["Scopus Indexed"] === "Yes"
                              ).length || 0
                            )}
                          </p>
                        </div>
                        <Globe className="text-purple-600" size={32} />
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-600 text-sm font-medium">
                            Rata-rata Dampak
                          </p>
                          <p className="text-2xl font-bold text-orange-800">
                            {filteredData?.length
                              ? (
                                  filteredData.reduce(
                                    (sum, item) =>
                                      sum +
                                      parseFloat(
                                        item.Impact?.replace(",", ".") || 0
                                      ),
                                    0
                                  ) / filteredData.length
                                ).toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                        <TrendingUp className="text-orange-600" size={32} />
                      </div>
                    </div>
                  </div>

                  {/* SINTA Level Distribution */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
                    {getSintaLevelData().map((level) => (
                      <div
                        key={level.name}
                        className="bg-gray-50 rounded-lg p-4 text-center"
                      >
                        <p className="text-gray-600 text-sm font-medium">
                          {level.name}
                        </p>
                        <p className="text-xl font-bold text-gray-800">
                          {formatNumber(level.value)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Distribusi Level SINTA
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getSintaLevelData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Bidang Subjek Teratas
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getSubjectAreaData().slice(0, 6)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {activeChart === "accreditation" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Akreditasi SINTA
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Status Akreditasi
                      </h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={getAccreditationData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value, percent }) =>
                              `${name}: ${formatNumber(value)} (${(
                                percent * 100
                              ).toFixed(1)}%)`
                            }
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {getAccreditationData().map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Level SINTA
                      </h3>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={getSintaLevelData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {activeChart === "subjects" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Distribusi Bidang Subjek
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={getSubjectAreaData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeChart === "impact" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Analisis Faktor Dampak
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart data={getImpactData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="impact" name="Faktor Dampak" />
                      <YAxis dataKey="citations" name="Sitasi" />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border rounded shadow">
                                <p className="font-medium text-sm">
                                  {data.fullName}
                                </p>
                                <p className="text-sm">Dampak: {data.impact}</p>
                                <p className="text-sm">
                                  Sitasi: {formatNumber(data.citations)}
                                </p>
                                <p className="text-sm">
                                  H5-Index: {data.h5Index}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Scatter dataKey="citations" fill="#10B981" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeChart === "indexing" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Status Pengindeksan
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Pengindeksan Scopus
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={getScopusIndexingData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value, percent }) =>
                              `${name}: ${formatNumber(value)} (${(
                                percent * 100
                              ).toFixed(1)}%)`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {getScopusIndexingData().map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.name === "Yes" ? "#10B981" : "#EF4444"
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Pengindeksan Garuda
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={getGarudaIndexingData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value, percent }) =>
                              `${name}: ${formatNumber(value)} (${(
                                percent * 100
                              ).toFixed(1)}%)`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {getGarudaIndexingData().map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.name === "Yes" ? "#3B82F6" : "#F59E0B"
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {activeChart === "institutions" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Institusi Teratas berdasarkan Jumlah Jurnal
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={getTopInstitutions()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={120}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#06B6D4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.div>

            {/* Data Preview with Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Pratinjau Data
                </h2>
                <div className="text-sm text-gray-600">
                  Menampilkan {startIndex + 1}-
                  {Math.min(endIndex, filteredData.length)} dari{" "}
                  {formatNumber(filteredData.length)} jurnal
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Nama Jurnal
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Akreditasi
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Bidang Subjek
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Afiliasi
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Dampak
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Sitasi
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                        Tautan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm">
                          <div className="max-w-xs">
                            <p className="font-medium text-gray-900 truncate">
                              {item["Nama Jurnal"]}
                            </p>
                            <p className="text-xs text-gray-500">
                              P-ISSN: {item["P-ISSN"] || "-"} | E-ISSN:{" "}
                              {item["E-ISSN"] || "-"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item["Akreditasi Sinta"]?.includes("S1")
                                ? "bg-green-100 text-green-800"
                                : item["Akreditasi Sinta"]?.includes("S2")
                                ? "bg-blue-100 text-blue-800"
                                : item["Akreditasi Sinta"]?.includes("S3")
                                ? "bg-indigo-100 text-indigo-800"
                                : item["Akreditasi Sinta"]?.includes("S4")
                                ? "bg-purple-100 text-purple-800"
                                : item["Akreditasi Sinta"]?.includes("S5")
                                ? "bg-pink-100 text-pink-800"
                                : item["Akreditasi Sinta"]?.includes("S6")
                                ? "bg-gray-100 text-gray-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item["Akreditasi Sinta"] || "Tidak Ditentukan"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="max-w-xs truncate">
                            {item["Subject Area"] || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="max-w-xs truncate">
                            {item["Afiliasi"] || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {item.Impact || "-"}
                            </span>
                            <span className="text-xs text-gray-500">
                              H5: {item["H5-index"] || "-"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.Citations
                            ? formatNumber(
                                parseInt(item.Citations.replace(/[.,]/g, ""))
                              )
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2 justify-center">
                            {item["Profile URL"] && (
                              <a
                                href={item["Profile URL"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                title="SINTA Profile"
                              >
                                <FileText size={16} />
                              </a>
                            )}
                            {item["Website URL"] && (
                              <a
                                href={item["Website URL"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800 transition-colors"
                                title="Journal Website"
                              >
                                <Globe size={16} />
                              </a>
                            )}
                            {item["Google Scholar URL"] && (
                              <a
                                href={item["Google Scholar URL"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-600 hover:text-orange-800 transition-colors"
                                title="Google Scholar"
                              >
                                <BookOpen size={16} />
                              </a>
                            )}
                            {item["Garuda URL"] && (
                              <a
                                href={item["Garuda URL"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 hover:text-red-800 transition-colors"
                                title="Garuda Profile"
                              >
                                <Egg size={16} />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Halaman {currentPage} dari {formatNumber(totalPages)}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Sebelumnya
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Selanjutnya
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {filteredData && filteredData.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tidak ada jurnal yang ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba sesuaikan filter atau kriteria pencarian Anda
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedAccreditation("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bersihkan Filter
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Visualisasi;
