import { useState, useEffect, useRef } from "react";
import PageHeader from "../components/PageHeader";
import Container from "./Components/Container";
import Card from "./Components/Card";
import Table from "./Components/Table";
import InputField from "./Components/InputField";
import TextArea from "./Components/TextArea";
import SelectField from "./Components/SelectField";
import Alert from "./Components/Alert";
import Modal from "./Components/Modal";
import Toast from "./Components/Toast";
import Loading from "./Components/Loading";
import Button from "./Components/Button";
import Badge from "./Components/Badge";
import Avatar from "./Components/Avatar";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";

export default function ComponentShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", category: "" });

  const [demoName, setDemoName] = useState("");
  const [demoCount, setDemoCount] = useState(0);
  const [effectMessage, setEffectMessage] = useState("Aplikasi belum melakukan efek apapun.");
  const [focusMessage, setFocusMessage] = useState("Tekan tombol untuk fokus input demo.");
  const nameInputRef = useRef(null);
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current += 1;
    setEffectMessage(`useEffect dijalankan karena demoName atau demoCount berubah. Render ke-${renderCountRef.current}.`);
  }, [demoName, demoCount]);

  const handleDemoFocus = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
      setFocusMessage("Input demo sekarang sudah difokuskan menggunakan useRef.");
    }
  };

  const handleIncrement = () => setDemoCount((prev) => prev + 1);

  const tableHeaders = ["No", "Nama", "Email", "Status"];
  const tableData = [
    { id: 1, name: "Andi Pratama", email: "andi@email.com", status: "Aktif" },
    { id: 2, name: "Budi Santoso", email: "budi@email.com", status: "Tidak Aktif" },
    { id: 3, name: "Citra Dewi", email: "citra@email.com", status: "Aktif" },
  ];

  const categoryOptions = [
    { value: "umum", label: "Umum" },
    { value: "premium", label: "Premium" },
    { value: "vip", label: "VIP" },
  ];

  const features = [
    { icon: "🚀", title: "Cepat", description: "Proses cepat dan efisien" },
    { icon: "🔒", title: "Aman", description: "Data terjamin keamanannya" },
    { icon: "💎", title: "Premium", description: "Kualitas terbaik" },
  ];

  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (isLoading) return <Loading fullScreen text="Memuat data..." />;

  return (
    <div id="component-showcase">
      <PageHeader title="Demo Komponen" breadcrumb={["Demo Komponen"]} />

      <Container>
        {/* Hero Section */}
        <HeroSection 
          title="Demo Komponen"
          subtitle="Demo semua komponen yang telah dibuat"
          buttonText="Mulai"
        />

        {/* Feature Section */}
        <FeatureSection features={features} title="Fitur Unggulan" />

        {/* Data Display - Card & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card title="Card Component">
            <p>Ini adalah contoh Card component.</p>
            <div className="mt-3 flex gap-2">
              <Badge type="success">Sukses</Badge>
              <Badge type="warning">Peringatan</Badge>
              <Badge type="danger">Bahaya</Badge>
              <Badge type="info">Info</Badge>
            </div>
            <div className="mt-3 flex gap-2">
              <Avatar name="Admin" size="sm" />
              <Avatar name="User" size="md" />
              <Avatar name="Guest" size="lg" />
            </div>
          </Card>

          <Card title="Table Component">
            <Table headers={tableHeaders}>
              {tableData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.id}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.email}</td>
                  <td className="p-3 border"><Badge type={item.status === "Aktif" ? "success" : "danger"}>{item.status}</Badge></td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>

        {/* Form Component */}
        <div className="mt-8">
          <Card title="Form Component">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Nama Lengkap" name="name" placeholder="Masukkan nama" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <InputField label="Email" type="email" name="email" placeholder="Masukkan email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <SelectField label="Kategori" name="category" options={categoryOptions} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <TextArea label="Catatan" name="notes" placeholder="Masukkan catatan..." />
            </div>
            <Button type="primary" className="mt-4">Kirim</Button>
          </Card>
        </div>

        {/* Hooks Demo */}
        <div className="mt-8">
          <Card title="Demo useState, useEffect, useRef">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Demo</label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    placeholder="Ketik nama di sini"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#432C81] focus:border-[#432C81] outline-none transition-all text-black"
                  />
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Button type="success" onClick={handleIncrement}>Tambah Counter</Button>
                  <Button type="secondary" onClick={handleDemoFocus}>Fokus Input</Button>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>useState</strong> menyimpan nilai <code>demoName</code> dan <code>demoCount</code>.</p>
                  <p><strong>useEffect</strong> mengeksekusi setiap kali <code>demoName</code> atau <code>demoCount</code> berubah.</p>
                  <p><strong>useRef</strong> menyimpan referensi input tanpa memaksa render ulang.</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="font-semibold mb-3">Hasil Demo</h4>
                <p className="mb-2"><strong>Nama saat ini:</strong> {demoName || "Belum diisi"}</p>
                <p className="mb-2"><strong>Counter:</strong> {demoCount}</p>
                <p className="mb-2 text-sm text-gray-600">{effectMessage}</p>
                <p className="text-sm text-gray-600">{focusMessage}</p>
                <p className="mt-3 text-xs text-gray-500">Jumlah render komponen: {renderCountRef.current}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl border border-indigo-100 p-4">
                <h5 className="font-semibold mb-2">useState</h5>
                <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                  <li><strong>What:</strong> menyimpan nilai input dan counter.</li>
                  <li><strong>Why:</strong> agar React tahu kapan harus merender ulang tampilan.</li>
                  <li><strong>Who:</strong> pengguna yang mengetik dan menekan tombol.</li>
                  <li><strong>When:</strong> saat input berubah atau tombol diklik.</li>
                  <li><strong>Where:</strong> di halaman demo komponen.</li>
                  <li><strong>How:</strong> `setState` mengubah state dan memperbarui UI.</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-amber-100 p-4">
                <h5 className="font-semibold mb-2">useEffect</h5>
                <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                  <li><strong>What:</strong> menjalankan side effect saat state berubah.</li>
                  <li><strong>Why:</strong> agar proses tambahan berjalan di luar render.</li>
                  <li><strong>Who:</strong> pengguna yang mengubah data demo.</li>
                  <li><strong>When:</strong> saat `demoName` atau `demoCount` berubah.</li>
                  <li><strong>Where:</strong> di bagian demo hooks halaman showcase.</li>
                  <li><strong>How:</strong> dependency array menentukan kapan efek dijalankan.</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-emerald-100 p-4">
                <h5 className="font-semibold mb-2">useRef</h5>
                <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                  <li><strong>What:</strong> menyimpan referensi DOM input.</li>
                  <li><strong>Why:</strong> karena fokus input tidak perlu state.</li>
                  <li><strong>Who:</strong> developer dan pengguna saat membuka fokus input.</li>
                  <li><strong>When:</strong> saat tombol fokus diklik.</li>
                  <li><strong>Where:</strong> di bagian demo hook `useRef`.</li>
                  <li><strong>How:</strong> menggunakan `ref.current` untuk memanggil `focus()`.</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Feedback Component */}
        <div className="mt-8">
          <Card title="Feedback Component">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Alert</h4>
                <Alert type="success" message="Operasi berhasil!" />
                <Alert type="warning" message="Periksa kembali data Anda!" />
                <Alert type="error" message="Terjadi kesalahan!" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Modal & Toast & Loading</h4>
                <div className="flex gap-3">
                  <Button type="primary" onClick={() => setIsModalOpen(true)}>Buka Modal</Button>
                  <Button type="success" onClick={() => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); }}>Tampilkan Toast</Button>
                  <Button type="warning" onClick={handleSimulateLoading}>Simulasi Loading</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Button Variants */}
        <div className="mt-8">
          <Card title="Button Variants">
            <div className="flex flex-wrap gap-3">
              <Button type="primary">Primer</Button>
              <Button type="success">Sukses</Button>
              <Button type="danger">Bahaya</Button>
              <Button type="warning">Peringatan</Button>
              <Button type="outline">Garis</Button>
              <Button type="secondary">Sekunder</Button>
            </div>
          </Card>
        </div>
      </Container>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Contoh Modal">
        <p>Ini adalah konten modal. Anda bisa menampilkan berbagai informasi di sini.</p>
        <div className="mt-4 flex justify-end">
          <Button type="secondary" onClick={() => setIsModalOpen(false)}>Tutup</Button>
        </div>
      </Modal>

      {/* Toast */}
      {showToast && <Toast message="Toast berhasil ditampilkan!" type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}