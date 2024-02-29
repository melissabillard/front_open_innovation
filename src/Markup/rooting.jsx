import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./Pages/Home";
import Contact from "./Pages/Contact";

export default function Rooting() {
    return (
        <>
            <BrowserRouter basename={'/'}>
                <Routes>
                    {/* Home page*/}
                    <Route path="/" element={<Index />} />
                    {/* Contact*/}
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}