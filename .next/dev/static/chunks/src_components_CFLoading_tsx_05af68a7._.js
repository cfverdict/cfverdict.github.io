(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/CFLoading.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CFLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CFLoading() {
    _s();
    const [states, setStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stateIndex, setStateIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CFLoading.useEffect": ()=>{
            // Generate random test cases
            const testCases = [
                1
            ];
            const numSteps = 3 + Math.floor(Math.random() * 3); // 3 to 5 steps
            let currentTest = 1;
            for(let i = 0; i < numSteps; i++){
                currentTest += Math.floor(Math.random() * 20) + 5; // Increment by 5-25
                testCases.push(currentTest);
            }
            const generatedStates = [
                {
                    text: 'In queue',
                    color: 'text-slate-400'
                },
                ...testCases.map({
                    "CFLoading.useEffect": (t)=>({
                            text: `Running on test ${t}`,
                            color: 'text-slate-300'
                        })
                }["CFLoading.useEffect"]),
                {
                    text: 'Accepted',
                    color: 'text-green-500'
                }
            ];
            setStates(generatedStates);
        }
    }["CFLoading.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CFLoading.useEffect": ()=>{
            if (states.length === 0 || stateIndex >= states.length - 1) return;
            const timeout = setTimeout({
                "CFLoading.useEffect.timeout": ()=>{
                    setStateIndex({
                        "CFLoading.useEffect.timeout": (prev)=>prev + 1
                    }["CFLoading.useEffect.timeout"]);
                }
            }["CFLoading.useEffect.timeout"], 400 + Math.random() * 400);
            return ({
                "CFLoading.useEffect": ()=>clearTimeout(timeout)
            })["CFLoading.useEffect"];
        }
    }["CFLoading.useEffect"], [
        stateIndex,
        states
    ]);
    if (states.length === 0) return null;
    const currentState = states[stateIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    className: `text-3xl font-bold font-mono ${currentState.color}`,
                    children: currentState.text
                }, stateIndex, false, {
                    fileName: "[project]/src/components/CFLoading.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                stateIndex < states.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                    },
                    className: "w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full mx-auto"
                }, void 0, false, {
                    fileName: "[project]/src/components/CFLoading.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CFLoading.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/CFLoading.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(CFLoading, "c3RoRfhlzX5D1Mr6WyMSEvjKzj4=");
_c = CFLoading;
var _c;
__turbopack_context__.k.register(_c, "CFLoading");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_CFLoading_tsx_05af68a7._.js.map