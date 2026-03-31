"use client";

import {
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  ChevronLeft,
  // Cpu,
  Target,
  // Trophy,
  Brain,
  Camera,
  Leaf,
  ExternalLink,
  Radio,
  CircuitBoard,
  Wrench,
} from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const hero = {
  name: "Joseph Zhang",
  title: "UCLA · Electrical Engineering",
  bio: "This portfolio website highlights a selection of projects I developed during my undergraduate studies, spanning embedded systems, computer vision, hardware design, signal processing, and machine learning. Each project includes a brief overview, relevant visuals, and a link to its GitHub repository or associated website.",
  email: "yanzh2432@gmail.com",
  github: "https://github.com/talcytoo",
  linkedin: "https://linkedin.com/in/jz432",
  image: "/profile.jpg",
};

interface Project {
  id: string;
  title: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  images: string[];
  tech: string[];
  overview: string[];
  contributions: string[];
  results: string[];
  github?: string;
  externalUrl?: string;
  externalLabel?: string;
}

const projects: Project[] = [
  {
    id: "dual-cam",
    title: "Dual-Camera Real-Time Video Stitching",
    role: "",
    icon: Camera,
    images: ["/dualcam-demo.gif", "/dualcam-setup.gif"],
    tech: ["C++", "CUDA", "OpenCV", "CMake"],
    github: "https://github.com/talcytoo/dualcamstitch",
    overview: [
      "A real-time video stitching system that combines feeds from two cameras into a seamless panoramic output.",
      "Uses ORB (Oriented FAST and Rotated BRIEF) feature detection for alignment with both CPU and GPU-accelerated implementations.",
      "The CUDA version implements a custom ORB pipeline with FAST keypoint detection, Harris corner scoring, BRIEF descriptors, and brute-force Hamming matching with parallel reduction.",
    ],
    contributions: [
      "Built the CPU baseline implementation using OpenCV's ORB detector and BFMatcher with Lowe's ratio test.",
      "Developed the CUDA-accelerated pipeline with custom GPU kernels for keypoint detection, descriptor computation, and matching.",
      "Integrated EMA-smoothed shift estimation, seam blending, and colour correction across frames.",
    ],
    results: [
      "Achieved real-time stitching on NVIDIA Jetson Orin (CUDA 12.6) with significantly improved throughput over the CPU baseline.",
    ],
  },
  {
    id: "ofdm",
    title: "OFDM Communication System on PlutoSDR",
    role: "",
    icon: Radio,
    images: ["/ofdm-1.png", "/ofdm-2.png", "/ofdm-3.png"],
    tech: ["Python", "PlutoSDR", "NumPy", "OFDM"],
    github: "https://github.com/talcytoo/ofdmplutosdr",
    overview: [
      "An OFDM (Orthogonal Frequency-Division Multiplexing) transceiver implemented in Python and tested over-the-air using ADALM-PlutoSDR software-defined radios.",
      "The system includes pilot insertion, cyclic prefix, frequency-domain equalization, and constellation decoding for QPSK and 16-QAM modulation.",
    ],
    contributions: [
      "Implemented the full OFDM transmit and receive chain including IFFT/FFT processing, pilot-based channel estimation, and symbol synchronization.",
      "Conducted over-the-air experiments with two PlutoSDR units, measuring BER and EVM across varying SNR conditions.",
    ],
    results: [
      "Demonstrated reliable QPSK and 16-QAM transmission over a real wireless link with measurable BER performance curves.",
    ],
  },
  {
    id: "ooo-cpu",
    title: "Out-of-Order RISC-V Processor",
    role: "",
    icon: CircuitBoard,
    images: ["/ooo-toplevel.png", "/ooo-testenv.png"],
    tech: ["SystemVerilog", "RISC-V", "Tomasulo", "Verilog"],
    github: "https://github.com/talcytoo/oooprocessor",
    overview: [
      "A fully pipelined out-of-order RISC-V RV32I processor core implemented in SystemVerilog.",
      "The core dynamically schedules instructions so that those with ready operands execute immediately while others wait, allowing independent instructions to overlap.",
      "Implements a Physical Register File (128 entries), Reorder Buffer (16 entries), three typed Reservation Stations, speculative branch prediction via a BTB with 2-bit BHT, and full misprediction recovery via checkpointing.",
    ],
    contributions: [
      "Designed and implemented the full pipeline: fetch, decode, rename, dispatch, issue, execute, writeback, and commit stages.",
      "Built the checkpoint-based recovery system that snapshots RAT, free list, and PRF valid bits on every branch for single-cycle rollback on mispredict.",
    ],
    results: [
      "Passed all verification test programs including hazard tests, branch loops, byte/halfword memory operations, and complex JALR call chains.",
    ],
  },
  {
    id: "smart-framing",
    title: "Smart Portrait Framing",
    role: "",
    icon: Camera,
    images: ["/smart-framing-demo.gif"],
    tech: ["Python", "YOLOv8", "MediaPipe", "OpenCV"],
    github: "https://github.com/talcytoo/smartframinglocal",
    overview: [
      "A real-time computer vision system for dynamic portrait framing and multi-person tracking, inspired by applied vision work during an internship at DTEN.",
      "The pipeline combines face detection, identity tracking, and layout generation built on YOLO models, 478-point face mesh tracking, and stabilization algorithms.",
      "A smoothing and re-entry correction mechanism reduces jitter, removes duplicates, and maintains consistent identity assignment across frames.",
    ],
    contributions: [
      "Implemented the complete framing system including face detection, mesh tracking, and bounding box fusion using YOLOv8 and Google MediaPipe Face Landmarker.",
      "Designed the identity stabilization module that uses temporal filtering, head pose estimation, and deduplication rules to maintain stable assignments across multiple faces.",
    ],
    results: [
      "Produced a fully functional real-time portrait framing demo capable of tracking multiple subjects and generating stable cropped outputs.",
    ],
  },
  {
    id: "spring-morph",
    title: "SpringMorph Haptic User Study",
    role: "",
    icon: Wrench,
    images: ["/springmorph-demo.gif", "/springmorph-model.png"],
    tech: ["3D Printing", "Embedded Systems", "Unity", "Serial Comms"],
    overview: [
      "Supported the SpringMorph haptic user study at the Human AI Experience Lab, led by a visiting PhD student.",
      "The platform consists of an 18-unit array of spring-powered actuators designed to generate programmable shape-shifting tactile feedback for VR and MR environments.",
      "Uses 3D-printed mechanical components, embedded sensors, and actuators to produce precise physical servo deformation patterns for haptic perception studies.",
    ],
    contributions: [
      "Led precision 3D printing, mechanical assembly, and calibration of all sensors and servo motion.",
      "Co-designed the serial communication protocol coordinating individual and group actuator behavior.",
      "Assisted with Unity integration by establishing a bidirectional serial pipeline and building example VR/MR environments using the Meta XR SDK.",
    ],
    results: [
      "Produced a fully assembled and calibrated actuator array suitable for lab demonstrations and early user study testing.",
    ],
  },
  {
    id: "iot-plant",
    title: "IoT Plant Observation System",
    role: "",
    icon: Leaf,
    images: ["/plant-iot.png"],
    tech: ["Arduino", "Python", "Flask", "OpenCV"],
    externalUrl:
      "https://devpost.com/software/thirsty-plants",
    externalLabel: "View on Devpost",
    overview: [
      "An Arduino-based IoT system for monitoring plant health in real time, developed as a submission for the UCSB 10th Hackathon.",
      "Soil moisture, humidity, and temperature sensors track environmental conditions while a live webcam feed is processed through image preprocessing stages to detect leaf discoloration.",
      "All sensor readings and camera analysis results stream to a Flask server, where a dashboard displays real-time data, visualizations, and time-series logs.",
    ],
    contributions: [
      "Built the sensor acquisition board and integrated the moisture, humidity, and temperature sensors.",
      "Developed the computer vision module including grayscale conversion, thresholding, contrast adjustments, and an anomaly classifier for detecting leaf discoloration.",
    ],
    results: [
      "Won first place in the Environmental category of the UCSB 10th Hackathon.",
    ],
  },
  {
    id: "news-classifier",
    title: "Online News Popularity Classifier",
    role: "",
    icon: Brain,
    images: ["/news-ai.png"],
    tech: ["Python", "K-Means", "SVD", "Neural Networks"],
    overview: [
      "Analyzed the Online News Popularity dataset (39,644 articles, 58 features) to build a classification system predicting whether an article will be popular.",
      "Evaluated linear models (K-Means, SVD) and nonlinear models (MLP neural network) with full preprocessing, feature reduction, and numerical stability analysis.",
    ],
    contributions: [
      "Implemented all preprocessing steps including standardization, feature reduction, correlation filtering, and dataset transformations.",
      "Developed the linear classification pipeline and the final MLP classifier achieving near-perfect accuracy.",
    ],
    results: [
      "Linear models achieved 55–63% accuracy depending on feature engineering.",
      "Nonlinear MLP classifier reached ~99.2% accuracy with AUC ≈ 0.999.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  };

  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-[4/3] max-h-[28rem] rounded-2xl overflow-hidden shadow-2xl shadow-zinc-200 border border-zinc-100">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-contain bg-zinc-50"
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide rounded-2xl"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex-none w-full aspect-[4/3] max-h-[28rem] snap-center rounded-2xl overflow-hidden shadow-2xl shadow-zinc-200 border border-zinc-100"
          >
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              className="object-contain bg-zinc-50"
            />
          </div>
        ))}
      </div>
      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function RepoButton({ project }: { project: Project }) {
  if (project.github) {
    return (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition shadow-sm"
      >
        <Github className="w-4 h-4" />
        View Source
        <ChevronRight className="w-3 h-3" />
      </a>
    );
  }
  if (project.externalUrl) {
    return (
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition shadow-sm"
      >
        <ExternalLink className="w-4 h-4" />
        {project.externalLabel ?? "View Project"}
        <ChevronRight className="w-3 h-3" />
      </a>
    );
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Mobile nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-6 py-4 flex justify-between items-center md:hidden">
        <span className="font-bold text-lg">{hero.name}</span>
        <a
          href={hero.github}
          target="_blank"
          className="text-sm font-medium text-indigo-600"
        >
          GitHub
        </a>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* ---- LEFT SIDEBAR ---- */}
        <aside className="md:w-1/3 lg:w-1/4 md:h-screen md:sticky md:top-0 p-8 flex flex-col justify-between border-r border-zinc-100 bg-zinc-50/50 pt-20 md:pt-8">
          <div>
            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={hero.image}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
              {hero.name}
            </h1>
            <p className="text-indigo-600 font-medium mb-6">{hero.title}</p>
            <p className="text-zinc-600 text-sm leading-relaxed mb-8">
              {hero.bio}
            </p>

            {/* Table of contents */}
            <nav className="hidden md:block">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Projects
              </p>
              <ul className="space-y-3">
                {projects.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      className="flex items-center gap-2 text-sm text-zinc-600 hover:text-indigo-600 transition group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-indigo-600 transition" />
                      {p.title}
                      {p.github && (
                        <Github className="w-3 h-3 text-zinc-400 group-hover:text-indigo-600 ml-auto shrink-0" />
                      )}
                      {!p.github && p.externalUrl && (
                        <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-indigo-600 ml-auto shrink-0" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex gap-4 mt-8 md:mt-0">
            <a
              href={hero.github}
              target="_blank"
              className="text-zinc-400 hover:text-zinc-900"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={hero.linkedin}
              target="_blank"
              className="text-zinc-400 hover:text-zinc-900"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${hero.email}`}
              className="text-zinc-400 hover:text-zinc-900"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </aside>

        {/* ---- RIGHT SCROLLABLE CONTENT ---- */}
        <main className="md:w-2/3 lg:w-3/4 p-6 md:p-16 lg:p-24 space-y-32 pt-20 md:pt-16">
          {projects.map((project, index) => (
            <section key={project.id} id={project.id} className="scroll-mt-20">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                  {project.title}
                </h2>

                {/* GitHub / external link button */}
                <div className="mb-6">
                  <RepoButton project={project} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-zinc-500 border border-zinc-200 px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 gap-12">
                {/* Overview */}
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" /> Overview
                  </h3>
                  <ul className="space-y-3">
                    {project.overview.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-zinc-600 leading-relaxed text-lg"
                      >
                        <span className="w-2 h-2 bg-indigo-400 rounded-full shrink-0 mt-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Images */}
                <ImageCarousel images={project.images} title={project.title} />

                {/* Contributions & Results — commented out for now */}
              </div>

              {/* Divider */}
              {index !== projects.length - 1 && (
                <div className="w-full h-px bg-zinc-100 mt-32" />
              )}
            </section>
          ))}

          <footer className="pt-20 pb-10 text-center text-zinc-400 text-sm">
            <p>&copy; 2026 Joseph Zhang. Built with Next.js &amp; Tailwind.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
