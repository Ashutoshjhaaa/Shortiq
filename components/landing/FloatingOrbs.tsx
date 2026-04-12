"use client";

export default function FloatingOrbs() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="noise-overlay" />
            <div className="vignette" />
            <div className="modern-grid" />
            <div className="orb orb-1" style={{ background: `radial-gradient(circle, var(--orb-1-color, #4f46e5), transparent 70%)` }} />
            <div className="orb orb-2" style={{ background: `radial-gradient(circle, var(--orb-2-color, #e11d48), transparent 70%)` }} />
            <div className="orb orb-3" style={{ background: `radial-gradient(circle, var(--orb-3-color, #7c3aed), transparent 70%)` }} />
        </div>
    );
}
