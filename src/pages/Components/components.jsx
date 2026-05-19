import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Container from "./Container";
import Button from "./Button";
import Badge from "./Badge";
import Avatar from "./Avatar";
import Card from "./Card";
import Table from "./Table";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextArea from "./TextArea";
import Checkbox from "./Checkbox";
import Alert from "./Alert";
import Modal from "./Modal";
import Toast from "./Toast";
import Tooltip from "./Tooltip";
import Loading from "./Loading";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import FAQSection from "./FAQSection";
import PricingSection from "./PricingSection";

export default function Components() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", category: "" });
  const [checked, setChecked] = useState(false);

  const tableHeaders = ["No", "Nama Produk", "Kategori", "Harga"];
  const tableData = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  const selectOptions = [
    { value: "elektronik", label: "Elektronik" },
    { value: "fashion", label: "Fashion" },
    { value: "aksesoris", label: "Aksesoris" }
  ];

  const features = [
    { icon: "🚀", title: "Cepat", description: "Proses yang sangat cepat" },
    { icon: "🔒", title: "Aman", description: "Data terjamin keamanannya" },
    { icon: "💎", title: "Premium", description: "Kualitas terbaik" },
    { icon: "🔄", title: "Mudah", description: "Penggunaan yang intuitif" }
  ];

  const faqs = [
    { question: "Apa itu React?", answer: "React adalah library JavaScript untuk membangun antarmuka pengguna." },
    { question: "Bagaimana cara menggunakan komponen?", answer: "Komponen dapat digunakan dengan mengimpornya dan memanggilnya seperti tag HTML." }
  ];

  const pricingPlans = [
    { name: "Basic", price: "Rp 100K", duration: "/bulan", features: ["Fitur 1", "Fitur 2", "Fitur 3"], popular: false },
    { name: "Pro", price: "Rp 250K", duration: "/bulan", features: ["Fitur 1", "Fitur 2", "Fitur 3", "Fitur 4"], popular: true },
    { name: "Enterprise", price: "Rp 500K", duration: "/bulan", features: ["Semua fitur Pro", "Dukungan prioritas", "Kustomisasi"], popular: false }
  ];

  const products = [
    { name: "Product 1", price: "Rp 100.000", image: "https://picsum.photos/id/20/300/200", description: "Deskripsi produk 1" },
    { name: "Product 2", price: "Rp 200.000", image: "https://picsum.photos/id/30/300/200", description: "Deskripsi produk 2" },
    { name: "Product 3", price: "Rp 300.000", image: "https://picsum.photos/id/40/300/200", description: "Deskripsi produk 3" }
  ];

  const handleToast = () => {
    setToastMessage("Toast berhasil ditampilkan!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div id="components-page">
      <PageHeader title="Components Playground" breadcrumb={["Dashboard", "Components"]} />

      <Container>
        {/* 1. Basic Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#432C81] mb-4">1. Basic Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Button">
              <div className="space-y-3">
                <Button type="primary">Primary</Button>
                <Button type="success">Success</Button>
                <Button type="danger">Danger</Button>
                <Button type="warning">Warning</Button>
                <Button type="outline">Outline</Button>
              </div>
            </Card>
            <Card title="Badge">
              <div className="space-x-2">
                <Badge type="primary">Primary</Badge>
                <Badge type="success">Success</Badge>
                <Badge type="warning">Warning</Badge>
                <Badge type="danger">Danger</Badge>
                <Badge type="info">Info</Badge>
              </div>
            </Card>
            <Card title="Avatar">
              <div className="flex gap-3">
                <Avatar name="John Doe" size="sm" />
                <Avatar name="Jane Smith" size="md" />
                <Avatar name="Admin" size="lg" />
                <Avatar name="User" size="xl" />
              </div>
            </Card>
          </div>
        </div>

        {/* 2. Layout Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#432C81] mb-4">2. Layout Component</h2>
          <Card title="Container & Grid">
            <Container className="bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-4 text-center rounded">Item 1</div>
                <div className="bg-blue-100 p-4 text-center rounded">Item 2</div>
                <div className="bg-blue-100 p-4 text-center rounded">Item 3</div>
                <div className="bg-blue-100 p-4 text-center rounded">Item 4</div>
              </div>
            </Container>
          </Card>
        </div>

        {/* 3. Data Display Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#432C81] mb-4">3. Data Display Component</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Table">
              <Table headers={tableHeaders}>
                {tableData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{item.id}</td>
                    <td className="p-3 border">{item.name}</td>
                    <td className="p-3 border">{item.category}</td>
                    <td className="p-3 border">{item.price}</td>
                  </tr>
                ))}
              </Table>
            </Card>
            <Card title="Card (Data Display)">
              <div className="space-y-3">
                <Card title="Card dalam Card">
                  <p>Ini adalah contoh nested card untuk menampilkan data.</p>
                  <Badge type="info" className="mt-2">Info Tambahan</Badge>
                </Card>
              </div>
            </Card>
          </div>
        </div>

        {/* 4. Form Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#432C81] mb-4">4. Form Component</h2>
          <Card title="Form Demo">
            <InputField label="Nama" name="name" placeholder="Masukkan nama" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <InputField label="Email" type="email" name="email" placeholder="Masukkan email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <SelectField label="Kategori" name="category" options={selectOptions} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            <TextArea label="Catatan" name="notes" placeholder="Masukkan catatan" />
            <Checkbox label="Setuju dengan syarat dan ketentuan" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <Button type="primary" className="mt-2">Submit</Button>
          </Card>
        </div>

        {/* 5. Feedback Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#432C81] mb-4">5. Feedback Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Alert & Toast">
              <Alert type="success" message="Operasi berhasil dilakukan!" />
              <Alert type="warning" message="Periksa kembali data Anda!" />
              <Alert type="error" message="Terjadi kesalahan pada sistem." />
              <Button type="primary" onClick={handleToast} className="mt-2">Tampilkan Toast</Button>
            </Card>
            <Card title="Modal & Tooltip">
              <Button type="primary" onClick={() => setIsModalOpen(true)}>Buka Modal</Button>
              <div className="mt-4 flex gap-3">
                <Tooltip text="Ini adalah tooltip">
                  <span className="cursor-pointer bg-gray-100 p-2 rounded">Hover saya (top)</span>
                </Tooltip>
                <Tooltip text="Tooltip di bawah" position="bottom">
                  <span className="cursor-pointer bg-gray-100 p-2 rounded">Hover saya (bottom)</span>
                </Tooltip>
              </div>
            </Card>
          </div>
        </div>

        {/* 6. Section Component */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#432C81] mb-4">6. Section Component</h2>
          <HeroSection title="Welcome to Playground" subtitle="Demo semua komponen React yang telah dibuat" buttonText="Get Started" />
          <FeatureSection features={features} />
          <FAQSection faqs={faqs} />
          <PricingSection plans={pricingPlans} />
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
      {showToast && <Toast message={toastMessage} type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}