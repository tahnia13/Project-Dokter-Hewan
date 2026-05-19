import { useState } from "react";
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
      <PageHeader title="Component Showcase" breadcrumb={["Dashboard", "Showcase"]} />

      <Container>
        {/* Hero Section */}
        <HeroSection 
          title="Component Showcase"
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
              <Badge type="success">Success</Badge>
              <Badge type="warning">Warning</Badge>
              <Badge type="danger">Danger</Badge>
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
            <Button type="primary" className="mt-4">Submit</Button>
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
              <Button type="primary">Primary</Button>
              <Button type="success">Success</Button>
              <Button type="danger">Danger</Button>
              <Button type="warning">Warning</Button>
              <Button type="outline">Outline</Button>
              <Button type="secondary">Secondary</Button>
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