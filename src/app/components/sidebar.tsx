"use client";

import { useState } from "react";

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <nav className="w-128 h-128">
            <div
                className={
                    (expanded ? "w-64" : "w-12") +
                    " h-screen bg-spotifygreen transition-all duration-400"
                }
            >
                <button
                    onClick={() =>
                        expanded ? setExpanded(false) : setExpanded(true)
                    }
                >
                    {expanded && <p>close</p>}
                    {!expanded && <p>open</p>}
                </button>
            </div>
        </nav>
    );
};
