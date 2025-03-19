"use client";

import { WelcomePage } from "./components/introduction";
import { useState } from "react";
import axios from "axios";

export default function Home() {
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [msg, setMsg] = useState<String | null>(null);

    return (
        <main className="w-screen h-screen overflow-x-hidden bg-gray-700 flex">
            {/*<WelcomePage />*/}
            <form onSubmit={onSubmit}>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
                <input type="submit" value="Upload" />
            </form>
        </main>
    );
}
