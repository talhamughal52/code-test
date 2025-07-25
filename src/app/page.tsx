"use client";

// // Claude Code
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import {
//   FileText,
//   Save,
//   Download,
//   Copy,
//   Maximize2,
//   Minimize2,
//   RotateCcw,
//   PanelRight,
//   Play,
//   Pause,
//   BarChart3,
//   CheckCircle,
//   AlertCircle,
//   Lightbulb,
//   Wand2,
//   Type,
//   Target,
//   BookOpen,
//   Clock,
//   Eye,
//   Users,
//   Plus,
//   Folder,
//   Settings,
//   Search,
//   Filter,
// } from "lucide-react";

// // Utility functions for text analysis
// const calculateReadingTime = (text) => {
//   const wordsPerMinute = 200;
//   const words = text
//     .trim()
//     .split(/\s+/)
//     .filter((word) => word.length > 0).length;
//   return Math.ceil(words / wordsPerMinute);
// };

// const calculateFleschScore = (text) => {
//   const sentences = text
//     .split(/[.!?]+/)
//     .filter((s) => s.trim().length > 0).length;
//   const words = text
//     .trim()
//     .split(/\s+/)
//     .filter((word) => word.length > 0).length;
//   const syllables = text.toLowerCase().match(/[aeiouy]+/g)?.length || 0;

//   if (sentences === 0 || words === 0) return 0;

//   const score =
//     206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
//   return Math.max(0, Math.min(100, Math.round(score)));
// };

// const getGradeLevel = (fleschScore) => {
//   if (fleschScore >= 90) return "5th Grade";
//   if (fleschScore >= 80) return "6th Grade";
//   if (fleschScore >= 70) return "7th Grade";
//   if (fleschScore >= 60) return "8th-9th Grade";
//   if (fleschScore >= 50) return "10th-12th Grade";
//   if (fleschScore >= 30) return "College Level";
//   return "Graduate Level";
// };

// const analyzeSentiment = (text) => {
//   const positiveWords = [
//     "good",
//     "great",
//     "excellent",
//     "amazing",
//     "wonderful",
//     "fantastic",
//     "love",
//     "like",
//     "enjoy",
//     "happy",
//     "pleased",
//     "satisfied",
//   ];
//   const negativeWords = [
//     "bad",
//     "terrible",
//     "awful",
//     "horrible",
//     "hate",
//     "dislike",
//     "sad",
//     "angry",
//     "frustrated",
//     "disappointed",
//     "poor",
//     "worst",
//   ];

//   const words = text.toLowerCase().split(/\s+/);
//   let positive = 0,
//     negative = 0;

//   words.forEach((word) => {
//     if (positiveWords.includes(word)) positive++;
//     if (negativeWords.includes(word)) negative++;
//   });

//   const total = positive + negative;
//   if (total === 0) return { positive: 33, negative: 33, neutral: 34 };

//   const posPercent = Math.round((positive / total) * 100);
//   const negPercent = Math.round((negative / total) * 100);
//   const neuPercent = 100 - posPercent - negPercent;

//   return { positive: posPercent, negative: negPercent, neutral: neuPercent };
// };

// const detectPassiveVoice = (text) => {
//   const passiveIndicators = /\b(was|were|been|being|is|are|am)\s+\w+ed\b/gi;
//   const matches = text.match(passiveIndicators) || [];
//   const sentences = text
//     .split(/[.!?]+/)
//     .filter((s) => s.trim().length > 0).length;
//   return sentences > 0 ? Math.round((matches.length / sentences) * 100) : 0;
// };

// const generateKeywordDensity = (text) => {
//   const words = text
//     .toLowerCase()
//     .split(/\s+/)
//     .filter((word) => word.length > 3);
//   const frequency = {};

//   words.forEach((word) => {
//     frequency[word] = (frequency[word] || 0) + 1;
//   });

//   return Object.entries(frequency)
//     .sort(([, a], [, b]) => b - a)
//     .slice(0, 10)
//     .map(([word, count]) => ({
//       word,
//       count,
//       density: Math.round((count / words.length) * 100 * 100) / 100,
//     }));
// };

// // Mock AI suggestions (in real app, these would call actual AI APIs)
// const generateMockSuggestions = (text, type) => {
//   const suggestions = {
//     grammar: [
//       {
//         original: "There is many issues",
//         suggestion: "There are many issues",
//         type: "grammar",
//         explanation: "Subject-verb agreement error",
//       },
//       {
//         original: "its very important",
//         suggestion: "it's very important",
//         type: "spelling",
//         explanation: "Missing apostrophe in contraction",
//       },
//     ],
//     expand: `${text}\n\nThis concept can be further explored by considering the underlying principles and practical applications. The implications extend beyond the immediate scope, affecting various stakeholders and creating opportunities for innovation and improvement.`,
//     condense: text.length > 100 ? text.substring(0, 100) + "..." : text,
//     rephrase: text
//       .split(".")
//       .map((sentence) =>
//         sentence.trim()
//           ? `${sentence.trim().charAt(0).toUpperCase()}${sentence
//               .trim()
//               .slice(1)
//               .toLowerCase()}.`
//           : ""
//       )
//       .join(" "),
//     titles: [
//       "The Ultimate Guide to " + (text.split(" ")[0] || "Success"),
//       "Mastering " + (text.split(" ")[1] || "Innovation"),
//       "5 Key Insights About " + (text.split(" ")[0] || "Growth"),
//       "Transform Your " + (text.split(" ")[0] || "Strategy"),
//     ],
//   };

//   return suggestions[type] || [];
// };

// const AIWritingDashboard = () => {
//   // Core state
//   const [content, setContent] = useState("");
//   const [documents, setDocuments] = useState([
//     {
//       id: 1,
//       name: "Untitled Document",
//       content: "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]);
//   const [activeDocId, setActiveDocId] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showAnalytics, setShowAnalytics] = useState(false);

//   // Editor state
//   const [undoStack, setUndoStack] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);
//   const [isWriting, setIsWriting] = useState(false);
//   const [wpm, setWpm] = useState(0);

//   // AI features state
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedTone, setSelectedTone] = useState("professional");
//   const [aiResults, setAiResults] = useState({});
//   const [isProcessing, setIsProcessing] = useState(false);

//   // UI state
//   const [activeTab, setActiveTab] = useState("editor");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const textareaRef = useRef(null);
//   const autosaveRef = useRef(null);
//   const writingStartTime = useRef(null);
//   const wordCountRef = useRef(0);

//   // Get active document
//   const activeDoc = documents.find((doc) => doc.id === activeDocId);

//   // Auto-save functionality
//   useEffect(() => {
//     if (autosaveRef.current) clearTimeout(autosaveRef.current);

//     autosaveRef.current = setTimeout(() => {
//       setDocuments((docs) =>
//         docs.map((doc) =>
//           doc.id === activeDocId
//             ? { ...doc, content, updatedAt: new Date() }
//             : doc
//         )
//       );
//     }, 30000);

//     return () => {
//       if (autosaveRef.current) clearTimeout(autosaveRef.current);
//     };
//   }, [content, activeDocId]);

//   // Writing speed tracking
//   useEffect(() => {
//     const words = content
//       .trim()
//       .split(/\s+/)
//       .filter((word) => word.length > 0).length;

//     if (words > wordCountRef.current) {
//       if (!writingStartTime.current) {
//         writingStartTime.current = Date.now();
//       }
//       setIsWriting(true);

//       const timeElapsed = (Date.now() - writingStartTime.current) / 60000; // minutes
//       if (timeElapsed > 0) {
//         setWpm(Math.round((words - wordCountRef.current) / timeElapsed));
//       }
//     }

//     wordCountRef.current = words;
//   }, [content]);

//   // Analytics calculations
//   const analytics = useMemo(() => {
//     if (!content.trim()) return null;

//     const words = content
//       .trim()
//       .split(/\s+/)
//       .filter((word) => word.length > 0);
//     const sentences = content
//       .split(/[.!?]+/)
//       .filter((s) => s.trim().length > 0);
//     const paragraphs = content
//       .split(/\n\s*\n/)
//       .filter((p) => p.trim().length > 0);

//     return {
//       characters: content.length,
//       words: words.length,
//       sentences: sentences.length,
//       paragraphs: paragraphs.length,
//       readingTime: calculateReadingTime(content),
//       fleschScore: calculateFleschScore(content),
//       gradeLevel: getGradeLevel(calculateFleschScore(content)),
//       sentiment: analyzeSentiment(content),
//       passiveVoice: detectPassiveVoice(content),
//       avgSentenceLength:
//         sentences.length > 0 ? Math.round(words.length / sentences.length) : 0,
//       keywordDensity: generateKeywordDensity(content),
//     };
//   }, [content]);

//   // Undo/Redo functionality
//   const saveToUndoStack = useCallback(() => {
//     setUndoStack((prev) => [...prev.slice(-19), content]);
//     setRedoStack([]);
//   }, [content]);

//   const undo = () => {
//     if (undoStack.length > 0) {
//       const previous = undoStack[undoStack.length - 1];
//       setRedoStack((prev) => [content, ...prev]);
//       setUndoStack((prev) => prev.slice(0, -1));
//       setContent(previous);
//     }
//   };

//   const redo = () => {
//     if (redoStack.length > 0) {
//       const next = redoStack[0];
//       setUndoStack((prev) => [...prev, content]);
//       setRedoStack((prev) => prev.slice(1));
//       setContent(next);
//     }
//   };

//   // AI Enhancement functions
//   const checkGrammar = async () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setSuggestions(generateMockSuggestions(content, "grammar"));
//       setIsProcessing(false);
//     }, 1500);
//   };

//   const enhanceContent = async (type) => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       const result = generateMockSuggestions(content, type);
//       setAiResults((prev) => ({ ...prev, [type]: result }));
//       setIsProcessing(false);
//     }, 2000);
//   };

//   const applyToneAdjustment = (tone) => {
//     setSelectedTone(tone);
//     // Mock tone adjustment
//     let adjusted = content;
//     if (tone === "formal") {
//       adjusted = content
//         .replace(/\bcan't\b/g, "cannot")
//         .replace(/\bwon't\b/g, "will not");
//     } else if (tone === "casual") {
//       adjusted = content
//         .replace(/\bcannot\b/g, "can't")
//         .replace(/\bwill not\b/g, "won't");
//     }
//     setContent(adjusted);
//   };

//   // Document management
//   const createDocument = () => {
//     const newDoc = {
//       id: Date.now(),
//       name: `Document ${documents.length + 1}`,
//       content: "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     setDocuments((prev) => [...prev, newDoc]);
//     setActiveDocId(newDoc.id);
//     setContent("");
//   };

//   const duplicateDocument = () => {
//     const currentDoc = documents.find((doc) => doc.id === activeDocId);
//     if (currentDoc) {
//       const newDoc = {
//         id: Date.now(),
//         name: `${currentDoc.name} (Copy)`,
//         content: currentDoc.content,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       setDocuments((prev) => [...prev, newDoc]);
//       setActiveDocId(newDoc.id);
//     }
//   };

//   const exportDocument = (format) => {
//     const doc = documents.find((d) => d.id === activeDocId);
//     if (!doc) return;

//     const blob = new Blob([doc.content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${doc.name}.${format}`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div
//       className={`flex h-screen bg-gray-50 ${
//         isFullscreen ? "fixed inset-0 z-50" : ""
//       }`}
//     >
//       {/* Sidebar */}
//       <div
//         className={`${
//           sidebarOpen ? "w-64" : "w-16"
//         } bg-white border-r border-gray-200 transition-all duration-300`}
//       >
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <FileText className="w-8 h-8 text-blue-600" />
//             {sidebarOpen && (
//               <h1 className="text-xl font-bold text-gray-800">WritingAI</h1>
//             )}
//           </div>
//         </div>

//         {sidebarOpen && (
//           <div className="p-4">
//             <button
//               onClick={createDocument}
//               className="w-full flex items-center gap-2 p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               New Document
//             </button>

//             <div className="mt-4">
//               <h3 className="text-sm font-medium text-gray-700 mb-2">
//                 Documents
//               </h3>
//               <div className="space-y-1">
//                 {documents.map((doc) => (
//                   <div
//                     key={doc.id}
//                     onClick={() => setActiveDocId(doc.id)}
//                     className={`p-2 text-sm rounded cursor-pointer ${
//                       doc.id === activeDocId
//                         ? "bg-blue-100 text-blue-800"
//                         : "hover:bg-gray-100"
//                     }`}
//                   >
//                     {doc.name}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="p-2 hover:bg-gray-100 rounded"
//                 >
//                   <Folder className="w-4 h-4" />
//                 </button>
//                 <input
//                   type="text"
//                   value={activeDoc?.name || ""}
//                   onChange={(e) =>
//                     setDocuments((docs) =>
//                       docs.map((doc) =>
//                         doc.id === activeDocId
//                           ? { ...doc, name: e.target.value }
//                           : doc
//                       )
//                     )
//                   }
//                   className="text-lg font-medium bg-transparent border-none outline-none"
//                 />
//               </div>

//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 {analytics && (
//                   <>
//                     <span>{analytics.words} words</span>
//                     <span>•</span>
//                     <span>{analytics.characters} characters</span>
//                     <span>•</span>
//                     <span>{analytics.readingTime} min read</span>
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={undo}
//                 disabled={undoStack.length === 0}
//                 className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
//               >
//                 <RotateCcw className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={redo}
//                 disabled={redoStack.length === 0}
//                 className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
//               >
//                 <PanelRight className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setIsFullscreen(!isFullscreen)}
//                 className="p-2 hover:bg-gray-100 rounded"
//               >
//                 {isFullscreen ? (
//                   <Minimize2 className="w-4 h-4" />
//                 ) : (
//                   <Maximize2 className="w-4 h-4" />
//                 )}
//               </button>
//               <button
//                 onClick={() => exportDocument("txt")}
//                 className="p-2 hover:bg-gray-100 rounded"
//               >
//                 <Download className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="flex">
//             {["editor", "enhance", "analytics"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-3 text-sm font-medium capitalize ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-600 hover:text-gray-800"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 overflow-hidden">
//           {activeTab === "editor" && (
//             <div className="h-full p-6">
//               <textarea
//                 ref={textareaRef}
//                 value={content}
//                 onChange={(e) => {
//                   setContent(e.target.value);
//                   saveToUndoStack();
//                 }}
//                 placeholder="Start writing your document..."
//                 className="w-full h-full resize-none border-none outline-none text-lg leading-relaxed"
//                 style={{ fontFamily: "Georgia, serif" }}
//               />
//             </div>
//           )}

//           {activeTab === "enhance" && (
//             <div className="h-full overflow-auto">
//               <div className="p-6 max-w-4xl mx-auto">
//                 {/* Tone Adjustment */}
//                 <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//                   <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                     <Type className="w-5 h-5 text-blue-600" />
//                     Tone Adjustment
//                   </h3>
//                   <div className="flex gap-2 mb-4">
//                     {["professional", "casual", "formal", "friendly"].map(
//                       (tone) => (
//                         <button
//                           key={tone}
//                           onClick={() => applyToneAdjustment(tone)}
//                           className={`px-4 py-2 rounded-full text-sm capitalize ${
//                             selectedTone === tone
//                               ? "bg-blue-600 text-white"
//                               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           {tone}
//                         </button>
//                       )
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Current tone:{" "}
//                     <span className="font-medium capitalize">
//                       {selectedTone}
//                     </span>
//                   </p>
//                 </div>

//                 {/* Grammar Check */}
//                 <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//                   <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     Grammar & Spelling
//                   </h3>
//                   <button
//                     onClick={checkGrammar}
//                     disabled={isProcessing}
//                     className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 mb-4"
//                   >
//                     {isProcessing ? "Checking..." : "Check Grammar"}
//                   </button>

//                   {suggestions.length > 0 && (
//                     <div className="space-y-3">
//                       {suggestions.map((suggestion, idx) => (
//                         <div
//                           key={idx}
//                           className="p-3 bg-yellow-50 border border-yellow-200 rounded"
//                         >
//                           <div className="flex items-start gap-2">
//                             <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
//                             <div>
//                               <p className="text-sm">
//                                 <span className="line-through text-red-600">
//                                   {suggestion.original}
//                                 </span>
//                                 {" → "}
//                                 <span className="text-green-600 font-medium">
//                                   {suggestion.suggestion}
//                                 </span>
//                               </p>
//                               <p className="text-xs text-gray-600 mt-1">
//                                 {suggestion.explanation}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Content Enhancement */}
//                 <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
//                   <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                     <Wand2 className="w-5 h-5 text-purple-600" />
//                     Content Enhancement
//                   </h3>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     {[
//                       {
//                         key: "expand",
//                         label: "Expand",
//                         desc: "Add more detail",
//                       },
//                       {
//                         key: "condense",
//                         label: "Condense",
//                         desc: "Make it shorter",
//                       },
//                       {
//                         key: "rephrase",
//                         label: "Rephrase",
//                         desc: "Say it differently",
//                       },
//                       {
//                         key: "titles",
//                         label: "Generate Titles",
//                         desc: "Create catchy titles",
//                       },
//                     ].map(({ key, label, desc }) => (
//                       <button
//                         key={key}
//                         onClick={() => enhanceContent(key)}
//                         disabled={isProcessing}
//                         className="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors disabled:opacity-50"
//                       >
//                         <div className="font-medium">{label}</div>
//                         <div className="text-sm text-gray-600">{desc}</div>
//                       </button>
//                     ))}
//                   </div>

//                   {Object.entries(aiResults).map(([type, result]) => (
//                     <div key={type} className="mt-4 p-4 bg-gray-50 rounded-lg">
//                       <h4 className="font-medium capitalize mb-2">
//                         {type} Result:
//                       </h4>
//                       {Array.isArray(result) ? (
//                         <ul className="space-y-1">
//                           {result.map((item, idx) => (
//                             <li key={idx} className="text-sm">
//                               • {item}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-sm">{result}</p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "analytics" && analytics && (
//             <div className="h-full overflow-auto">
//               <div className="p-6 max-w-6xl mx-auto">
//                 {/* Overview Cards */}
//                 <div className="grid grid-cols-4 gap-6 mb-8">
//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-blue-100 rounded-lg">
//                         <FileText className="w-6 h-6 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold">{analytics.words}</p>
//                         <p className="text-sm text-gray-600">Words</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-green-100 rounded-lg">
//                         <Clock className="w-6 h-6 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold">
//                           {analytics.readingTime}
//                         </p>
//                         <p className="text-sm text-gray-600">Min Read</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-yellow-100 rounded-lg">
//                         <Target className="w-6 h-6 text-yellow-600" />
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold">
//                           {analytics.fleschScore}
//                         </p>
//                         <p className="text-sm text-gray-600">Readability</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-purple-100 rounded-lg">
//                         <BookOpen className="w-6 h-6 text-purple-600" />
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold">
//                           {analytics.gradeLevel}
//                         </p>
//                         <p className="text-sm text-gray-600">Grade Level</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-8">
//                   {/* Readability Metrics */}
//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <h3 className="text-lg font-semibold mb-4">
//                       Readability Metrics
//                     </h3>
//                     <div className="space-y-4">
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Avg Sentence Length</span>
//                           <span>{analytics.avgSentenceLength} words</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-blue-600 h-2 rounded-full"
//                             style={{
//                               width: `${Math.min(
//                                 analytics.avgSentenceLength * 5,
//                                 100
//                               )}%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Passive Voice</span>
//                           <span>{analytics.passiveVoice}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-orange-500 h-2 rounded-full"
//                             style={{ width: `${analytics.passiveVoice}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Sentiment Analysis */}
//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <h3 className="text-lg font-semibold mb-4">
//                       Sentiment Analysis
//                     </h3>
//                     <div className="space-y-4">
//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Positive</span>
//                           <span>{analytics.sentiment.positive}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-green-500 h-2 rounded-full"
//                             style={{
//                               width: `${analytics.sentiment.positive}%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Negative</span>
//                           <span>{analytics.sentiment.negative}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-red-500 h-2 rounded-full"
//                             style={{
//                               width: `${analytics.sentiment.negative}%`,
//                             }}
//                           ></div>
//                         </div>
//                       </div>

//                       <div>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Neutral</span>
//                           <span>{analytics.sentiment.neutral}%</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className="bg-gray-500 h-2 rounded-full"
//                             style={{ width: `${analytics.sentiment.neutral}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Writing Stats */}
//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <h3 className="text-lg font-semibold mb-4">
//                       Writing Statistics
//                     </h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="text-center p-4 bg-gray-50 rounded-lg">
//                         <p className="text-2xl font-bold text-blue-600">
//                           {analytics.sentences}
//                         </p>
//                         <p className="text-sm text-gray-600">Sentences</p>
//                       </div>
//                       <div className="text-center p-4 bg-gray-50 rounded-lg">
//                         <p className="text-2xl font-bold text-green-600">
//                           {analytics.paragraphs}
//                         </p>
//                         <p className="text-sm text-gray-600">Paragraphs</p>
//                       </div>
//                       <div className="text-center p-4 bg-gray-50 rounded-lg">
//                         <p className="text-2xl font-bold text-purple-600">
//                           {wpm}
//                         </p>
//                         <p className="text-sm text-gray-600">WPM</p>
//                       </div>
//                       <div className="text-center p-4 bg-gray-50 rounded-lg">
//                         <p className="text-2xl font-bold text-orange-600">
//                           {analytics.characters}
//                         </p>
//                         <p className="text-sm text-gray-600">Characters</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Keyword Density */}
//                   <div className="bg-white p-6 rounded-lg border border-gray-200">
//                     <h3 className="text-lg font-semibold mb-4">Top Keywords</h3>
//                     <div className="space-y-3">
//                       {analytics.keywordDensity
//                         .slice(0, 8)
//                         .map(({ word, count, density }) => (
//                           <div
//                             key={word}
//                             className="flex items-center justify-between"
//                           >
//                             <div className="flex items-center gap-3">
//                               <span className="text-sm font-medium capitalize">
//                                 {word}
//                               </span>
//                               <span className="text-xs text-gray-500">
//                                 {count} times
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <div className="w-24 bg-gray-200 rounded-full h-2">
//                                 <div
//                                   className="bg-indigo-500 h-2 rounded-full"
//                                   style={{
//                                     width: `${Math.min(density * 10, 100)}%`,
//                                   }}
//                                 ></div>
//                               </div>
//                               <span className="text-xs text-gray-600 w-12 text-right">
//                                 {density}%
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Document History */}
//                 <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
//                   <h3 className="text-lg font-semibold mb-4">
//                     Document Activity
//                   </h3>
//                   <div className="space-y-3">
//                     {documents.map((doc) => (
//                       <div
//                         key={doc.id}
//                         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                       >
//                         <div className="flex items-center gap-3">
//                           <FileText className="w-4 h-4 text-gray-400" />
//                           <div>
//                             <p className="font-medium">{doc.name}</p>
//                             <p className="text-xs text-gray-600">
//                               Last edited: {doc.updatedAt.toLocaleDateString()}{" "}
//                               at {doc.updatedAt.toLocaleTimeString()}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-600">
//                             {
//                               doc.content
//                                 .trim()
//                                 .split(/\s+/)
//                                 .filter((word) => word.length > 0).length
//                             }{" "}
//                             words
//                           </span>
//                           <button
//                             onClick={() => {
//                               setActiveDocId(doc.id);
//                               setContent(doc.content);
//                               setActiveTab("editor");
//                             }}
//                             className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
//                           >
//                             Open
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Export Options */}
//                 <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
//                   <h3 className="text-lg font-semibold mb-4">Export Options</h3>
//                   <div className="flex gap-4">
//                     {[
//                       { format: "txt", label: "Plain Text", icon: FileText },
//                       { format: "md", label: "Markdown", icon: FileText },
//                       { format: "html", label: "HTML", icon: FileText },
//                       { format: "pdf", label: "PDF", icon: FileText },
//                     ].map(({ format, label, icon: Icon }) => (
//                       <button
//                         key={format}
//                         onClick={() => exportDocument(format)}
//                         className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
//                       >
//                         <Icon className="w-4 h-4" />
//                         <span className="text-sm">{label}</span>
//                       </button>
//                     ))}
//                     <button
//                       onClick={duplicateDocument}
//                       className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
//                     >
//                       <Copy className="w-4 h-4" />
//                       <span className="text-sm">Duplicate</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Status Bar */}
//         <div className="bg-gray-100 border-t border-gray-200 px-6 py-2">
//           <div className="flex items-center justify-between text-xs text-gray-600">
//             <div className="flex items-center gap-4">
//               <span>Auto-saved</span>
//               {isWriting && (
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span>Writing...</span>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center gap-4">
//               {analytics && (
//                 <>
//                   <span>Line 1, Column {content.length}</span>
//                   <span>UTF-8</span>
//                   <span>Selected: 0</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Button for Quick Actions */}
//       <div className="fixed bottom-6 right-6 z-40">
//         <div className="relative group">
//           <button className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
//             <Wand2 className="w-6 h-6" />
//           </button>

//           <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
//             <button
//               onClick={checkGrammar}
//               className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
//             >
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               Quick Grammar Check
//             </button>
//             <button
//               onClick={() => enhanceContent("expand")}
//               className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
//             >
//               <Lightbulb className="w-4 h-4 text-yellow-600" />
//               Expand Content
//             </button>
//             <button
//               onClick={() => setActiveTab("analytics")}
//               className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
//             >
//               <BarChart3 className="w-4 h-4 text-purple-600" />
//               View Analytics
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIWritingDashboard;

// GPT Code

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

const Editor = dynamic(() => import("@uiw/react-textarea-code-editor"), {
  ssr: false,
});

export default function Home() {
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState("");
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("editorContent");
    if (saved) setContent(saved);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (content) {
        setSaving(true);
        localStorage.setItem("editorContent", content);
        setLastSaved(new Date().toLocaleTimeString());
        setSaving(false);
      }
    }, 30000);

    return () => clearInterval(timer);
  }, [content]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean);
    const paras = content
      .trim()
      .split(/\n{2,}/)
      .filter(Boolean);
    setWordCount(words.length);
    setCharCount(content.length);
    setParagraphCount(paras.length);
    setReadingTime(Math.ceil(words.length / 200));
  }, [content]);

  const handleUndo = () => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      setContent(last);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleChange = (val: string) => {
    setHistory((prev) => [...prev, content]);
    setContent(val);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">AI Writing Assistant</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Last saved: {lastSaved || "Not yet"}
              </span>
              {saving && <Loader className="animate-spin" size={16} />}
            </div>
            <Editor
              value={content}
              language="markdown"
              placeholder="Start writing your text here..."
              onChange={(e) => handleChange(e.target.value)}
              className="min-h-[300px] text-base font-mono p-2 rounded-md border"
            />

            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
              <span>Words: {wordCount}</span>
              <span>Characters: {charCount}</span>
              <span>Paragraphs: {paragraphCount}</span>
              <span>Read time: {readingTime} min</span>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="secondary" onClick={handleUndo}>
                Undo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <Tabs defaultValue="tone">
              <TabsList>
                <TabsTrigger value="tone">Tone</TabsTrigger>
                <TabsTrigger value="clarity">Clarity</TabsTrigger>
                <TabsTrigger value="rephrase">Rephrase</TabsTrigger>
                <TabsTrigger value="summary">Condense</TabsTrigger>
              </TabsList>
              <TabsContent value="tone">
                <Textarea placeholder="Detect and adjust tone here..." />
              </TabsContent>
              <TabsContent value="clarity">
                <Textarea placeholder="Simplify complex sentences..." />
              </TabsContent>
              <TabsContent value="rephrase">
                <Textarea placeholder="Paste sentence to rephrase..." />
              </TabsContent>
              <TabsContent value="summary">
                <Textarea placeholder="Summarize your content here..." />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
