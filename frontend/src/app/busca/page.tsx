"use client";

import Footer from "@/_components/footer/footer";
import Navbar from "@/_components/navbar/navbar";
import Card from "@/_components/searchbar/card";
import SearchField from "@/_components/searchbar/input-search";
import { useState, type ChangeEvent } from "react";
import FilterField from "@/_components/searchbar/input-filter";

export default function Page() {
    const [search, setSearch] = useState<string>("");

    const submit = () => { };

    return (
        <main className="bg-surface-inverse">
            <Navbar />
            <div className="mt-20 mb-12 w-11/12 m-auto flex gap-4">
                <SearchField state={search} change={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} submit={submit} />
                <FilterField options={["Artistas", "Espaços", "Eventos"]} />
            </div>

            <section className="w-11/12 m-auto grid grid-cols-4 gap-20">
                {
                    Array.from({ length: 50 }).map((_, index) => (
                        <Card key={index}/>
                    ))
                }
            </section>

            <Footer />
        </main>
    )

}