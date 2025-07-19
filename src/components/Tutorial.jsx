import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Download,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  BookOpen,
  Terminal,
  Copy,
  ExternalLink,
} from "lucide-react";

const Tutorial = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedCode, setCopiedCode] = useState("");

  const copyToClipboard = (code, section) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(section);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const codeExample = `import requests
from bs4 import BeautifulSoup
import json
import csv
import time
from fake_useragent import UserAgent
from urllib3.exceptions import InsecureRequestWarning
from urllib.robotparser import RobotFileParser

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

def check_robots_txt(base_url, user_agent='*'):
    """
    Check if scraping is allowed according to robots.txt
    """
    try:
        rp = RobotFileParser()
        rp.set_url(f"{base_url}/robots.txt")
        rp.read()
        return rp.can_fetch(user_agent, base_url)
    except Exception as e:
        print(f"Warning: Could not check robots.txt: {e}")
        return True  # Assume allowed if can't check

def scrape_sinta_journals(html_content):
    """
    Parse HTML content to extract journal information
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    journals_data = []

    journal_items = soup.find_all('div', class_='list-item row mt-3')

    for item in journal_items:
        journal = {}

        # Extract journal name and profile URL
        journal_name_tag = item.find('div', class_='affil-name mb-3')
        if journal_name_tag and journal_name_tag.a:
            journal['Nama Jurnal'] = journal_name_tag.a.text.strip()
            journal['Profile URL'] = journal_name_tag.a['href']
        else:
            journal['Nama Jurnal'] = None
            journal['Profile URL'] = None

        # Extract external links
        affil_abbrev_div = item.find('div', class_='affil-abbrev')
        if affil_abbrev_div:
            links = affil_abbrev_div.find_all('a')
            for link in links:
                if 'Google Scholar' in link.text:
                    journal['Google Scholar URL'] = link['href']
                elif 'Website' in link.text:
                    journal['Website URL'] = link['href']
                elif 'Editor URL' in link.text:
                    journal['Editor URL'] = link['href']

        # Extract ISSN and subject area
        profile_id_div = item.find('div', class_='profile-id')
        if profile_id_div:
            text_content = profile_id_div.text.strip()
            
            # Parse P-ISSN
            if 'P-ISSN :' in text_content:
                p_issn_start = text_content.find('P-ISSN :') + len('P-ISSN :')
                p_issn_end = text_content.find('|', p_issn_start)
                if p_issn_end == -1:
                    e_issn_start_check = text_content.find('E-ISSN :', p_issn_start)
                    if e_issn_start_check != -1:
                        p_issn_end = e_issn_start_check
                    else:
                        p_issn_end = len(text_content)
                journal['P-ISSN'] = text_content[p_issn_start:p_issn_end].strip()

            # Parse E-ISSN
            if 'E-ISSN :' in text_content:
                e_issn_start = text_content.find('E-ISSN :') + len('E-ISSN :')
                e_issn_end = text_content.find('Subject Area :', e_issn_start)
                if e_issn_end == -1:
                    e_issn_end = len(text_content)
                journal['E-ISSN'] = text_content[e_issn_start:e_issn_end].replace('|', '').strip()

            # Parse Subject Area
            if 'Subject Area :' in text_content:
                subject_area_start = text_content.find('Subject Area :') + len('Subject Area :')
                journal['Subject Area'] = text_content[subject_area_start:].strip()

        # Extract affiliation
        affil_loc_tag = item.find('div', class_='affil-loc mt-2')
        if affil_loc_tag and affil_loc_tag.a:
            journal['Afiliasi'] = affil_loc_tag.a.text.strip()

        # Extract accreditation and indexing status
        stat_prev_div = item.find('div', class_='stat-prev mt-2')
        if stat_prev_div:
            sinta_accredited = stat_prev_div.find('span', class_='num-stat accredited')
            journal['Akreditasi Sinta'] = sinta_accredited.text.strip() if sinta_accredited else None

            scopus_indexed = stat_prev_div.find('span', class_='num-stat scopus-indexed')
            journal['Scopus Indexed'] = 'Yes' if scopus_indexed else 'No'

            garuda_indexed = stat_prev_div.find('span', class_='num-stat garuda-indexed')
            journal['Garuda Indexed'] = 'Yes' if garuda_indexed else 'No'

        # Extract statistics
        stat_profile_div = item.find('div', class_='stat-profile journal-list-stat mt-3')
        if stat_profile_div:
            stats = stat_profile_div.find_all('div', class_='pr-txt')
            nums = stat_profile_div.find_all('div', class_='pr-num')

            for i in range(len(stats)):
                stat_name = stats[i].text.strip()
                stat_value = nums[i].text.strip()
                journal[stat_name] = stat_value

        journals_data.append(journal)

    return journals_data

def main():
    """
    Main scraping function with ethical considerations
    """
    base_url = "https://sinta.kemdikbud.go.id"
    
    # Check robots.txt before scraping
    if not check_robots_txt(base_url):
        print("❌ Scraping not allowed according to robots.txt")
        print("Consider using official API if available")
        return
    
    print("✅ Robots.txt check passed")
    
    all_journals_data = []
    max_pages = 10  # Reduced for demonstration - adjust as needed
    page = 1
    
    # Respectful headers
    headers = {
        'User-Agent': 'Educational Research Bot 1.0 (contact@university.edu)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }

    while page <= max_pages:
        url = f"{base_url}/journals?page={page}"
        print(f"📄 Scraping page {page}...")
        
        try:
            response = requests.get(url, headers=headers, verify=False, timeout=15)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"❌ Error fetching page {page}: {e}")
            time.sleep(10)  # Longer wait on error
            continue

        scraped_data = scrape_sinta_journals(response.text)
        if not scraped_data:
            print(f"⚠️ No data found on page {page}. Waiting before retrying...")
            time.sleep(10)
            continue

        all_journals_data.extend(scraped_data)
        print(f"✅ Scraped {len(scraped_data)} journals from page {page}")
        page += 1
        
        # Respectful delay between requests
        time.sleep(3)  # Increased delay to be more respectful

    # Save data
    if all_journals_data:
        # Save as JSON
        with open('sinta_journals.json', 'w', encoding='utf-8') as f:
            json.dump(all_journals_data, f, ensure_ascii=False, indent=4)
        
        # Save as CSV
        csv_file = 'sinta_journals.csv'
        keys = all_journals_data[0].keys()
        with open(csv_file, 'w', newline='', encoding='utf-8') as output_file:
            dict_writer = csv.DictWriter(output_file, keys)
            dict_writer.writeheader()
            dict_writer.writerows(all_journals_data)
        
        print(f"💾 Data saved to sinta_journals.json and {csv_file}")
        print(f"📊 Total journals scraped: {len(all_journals_data)}")
    else:
        print("❌ No data to save.")

if __name__ == '__main__':
    main()`;

  const installationCode = `# Install required packages
pip install requests beautifulsoup4 fake-useragent

# Create virtual environment (recommended)
python -m venv sinta_scraper
source sinta_scraper/bin/activate  # On Windows: sinta_scraper\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt`;

  const requirementsTxt = `requests==2.31.0
beautifulsoup4==4.12.2
fake-useragent==1.4.0
lxml==4.9.3`;

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "installation", label: "Installation", icon: Download },
    { id: "code", label: "Code Example", icon: Code },
    { id: "ethics", label: "Ethics & Best Practices", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tutorial Web Scraping SINTA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pelajari cara mengumpulkan data jurnal dari SINTA dengan etis dan
            bertanggung jawab
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tentang Tutorial Ini
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Apa yang akan Anda pelajari:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1" size={16} />
                      <span>
                        Cara menggunakan BeautifulSoup untuk parsing HTML
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1" size={16} />
                      <span>Implementasi pengecekan robots.txt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1" size={16} />
                      <span>
                        Teknik scraping yang etis dan bertanggung jawab
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-1" size={16} />
                      <span>Export data ke format JSON dan CSV</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Prasyarat:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Terminal className="text-blue-500 mt-1" size={16} />
                      <span>Python 3.7+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Terminal className="text-blue-500 mt-1" size={16} />
                      <span>Pemahaman dasar HTML/CSS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Terminal className="text-blue-500 mt-1" size={16} />
                      <span>Koneksi internet stabil</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-yellow-800">Penting!</h4>
                    <p className="text-yellow-700 mt-1">
                      Tutorial ini mengajarkan teknik scraping yang etis dengan
                      menghormati robots.txt dan menggunakan delay yang wajar
                      antar request. Selalu gunakan data yang diperoleh untuk
                      tujuan pendidikan dan penelitian.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "installation" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Instalasi dan Setup
              </h2>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  1. Install Dependencies
                </h3>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{installationCode}</code>
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(installationCode, "installation")
                    }
                    className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                  >
                    {copiedCode === "installation" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  2. Requirements.txt
                </h3>
                <p className="text-gray-600">
                  Buat file requirements.txt untuk dependency management:
                </p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{requirementsTxt}</code>
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(requirementsTxt, "requirements")
                    }
                    className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                  >
                    {copiedCode === "requirements" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  Tips Virtual Environment:
                </h4>
                <p className="text-blue-700">
                  Gunakan virtual environment untuk mengisolasi dependencies
                  project Anda. Ini akan mencegah konflik dengan package lain di
                  sistem Anda.
                </p>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Kode Scraper yang Etis
                </h2>
                <button
                  onClick={() => copyToClipboard(codeExample, "main")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {copiedCode === "main" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                  {copiedCode === "main" ? "Copied!" : "Copy Code"}
                </button>
              </div>

              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-96">
                  <code>{codeExample}</code>
                </pre>
              </div>

              <div className="grid md:grid-cols gap-6 mt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">
                    Fitur Utama:
                  </h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Pengecekan robots.txt otomatis</li>
                    <li>• Delay yang wajar antar request</li>
                    <li>• Error handling yang robust</li>
                    <li>• Export ke JSON dan CSV</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ethics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Etika Web Scraping
              </h2>

              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle size={20} />
                    Hal yang HARUS Dihindari
                  </h3>
                  <ul className="text-red-700 space-y-2">
                    <li>• Scraping terlalu cepat (flooding server)</li>
                    <li>• Mengabaikan robots.txt</li>
                    <li>
                      • Menggunakan data untuk tujuan komersial tanpa izin
                    </li>
                    <li>
                      • Tidak mengidentifikasi diri dengan User-Agent yang jelas
                    </li>
                    <li>• Melanggar Terms of Service website</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={20} />
                    Best Practices
                  </h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• Selalu cek robots.txt terlebih dahulu</li>
                    <li>• Gunakan delay minimal 1-3 detik antar request</li>
                    <li>
                      • Identifikasi diri dengan User-Agent yang informatif
                    </li>
                    <li>• Batasi jumlah request per menit</li>
                    <li>
                      • Gunakan data hanya untuk tujuan pendidikan/penelitian
                    </li>
                    <li>• Respectful error handling dan retry logic</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Globe size={20} />
                    Alternatif yang Lebih Baik
                  </h3>
                  <div className="text-blue-700 space-y-2">
                    <p>Sebelum scraping, pertimbangkan alternatif berikut:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Cari API resmi yang tersedia</li>
                      <li>• Hubungi pihak website untuk akses data</li>
                      <li>• Gunakan dataset publik yang sudah tersedia</li>
                      <li>• Pertimbangkan partnership atau kolaborasi</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText size={20} />
                    Aspek Legal
                  </h3>
                  <div className="text-gray-700 space-y-2">
                    <p>Pastikan aktivitas scraping Anda sesuai dengan:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Undang-undang hak cipta yang berlaku</li>
                      <li>• Terms of Service website target</li>
                      <li>• Regulasi perlindungan data pribadi</li>
                      <li>• Etika penelitian akademik</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  💡 Ingat: Tujuan scraping yang etis adalah memperoleh data
                  untuk penelitian dan pendidikan tanpa merugikan pihak lain.
                  Selalu prioritaskan transparansi dan tanggung jawab!
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Tutorial;
