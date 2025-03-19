import React, { useEffect, useState } from "react";
import axios from "axios";

const POList = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [poData, setPOData] = useState([]);
    const [woData, setWOData] = useState([]);

    useEffect(() => {
        fetchPOData();
        fetchWOData();
    }, []);

    const fetchPOData = async () => {
        try {
            const response = await axios.get("/api/po-data");
            setPOData(response.data);
        } catch (error) {
            console.error("Error fetching TE data", error);
        }
    };

    const fetchWOData = async () => {
        try {
            const response = await axios.get("/api/wo-data");
            setWOData(response.data);
        } catch (error) {
            console.error("Error fetching PO data", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { poNumber, poDate } = response.data;

            setMessage(`✅ File uploaded successfully! TE Number: ${poNumber}, TE Date: ${poDate}`);
            fetchPOData();
        } catch (error) {
            setMessage(error.response?.data?.message || "Error uploading file");
        }
    };

    const handleConvert = async (poNumber) => {
        try {
            const response = await axios.post("/api/convert-to-wo", { poNumber });
            alert(`WO Number Created: ${response.data.woNumber}`);
            fetchWOData();
        } catch (error) {
            alert(error.response?.data?.message || "Conversion failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this TE?")) return;

        try {
            await axios.delete(`/api/delete-po/${id}`);
            alert("TE deleted successfully");
            fetchPOData();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Document Management</h1>

            {/* File Upload Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Upload Tender Enquiry PDF</h2>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="border rounded p-2 w-full"
                />
                <button
                    onClick={handleUpload}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Upload
                </button>
                {message && <p className="mt-2 text-green-600">{message}</p>}
            </div>

            {/* PO List */}
            <h2 className="text-xl font-semibold mb-2">Tender Enquiry (TE) List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">TE Number</th>
                            <th className="p-2 border">TE Date</th>
                            <th className="p-2 border">File Name</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {poData.map((po, index) => (
                            <tr key={po._id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-300">
                                <td className="p-2 border">{po.poNumber}</td>
                                <td className="p-2 border">{po.poDate}</td>
                                <td className="p-2 border">{po.fileName}</td>
                                <td className="p-2 border flex gap-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        onClick={() => handleConvert(po.poNumber)}
                                    >
                                        Convert to WO
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(po._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* WO List */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Purchase Orders (PO) List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">PO Number</th>
                            <th className="p-2 border">TE Number</th>
                            <th className="p-2 border">TE Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {woData.map((wo) => (
                            <tr key={wo._id} className="hover:bg-gray-50">
                                <td className="p-2 border">{wo.woNumber}</td>
                                <td className="p-2 border">{wo.poNumber}</td>
                                <td className="p-2 border">{wo.poDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default POList;
