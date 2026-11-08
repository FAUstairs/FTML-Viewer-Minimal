import "./style.css";

const MATHHUB_BACKEND = "https://mathhub.info";
const AUTO_COMPUTATION_SYMBOL_URI =
  "http://mathhub.info?a=smglom/automata&p=mod&m=auto-computation&s=computation";

type FloDownBlock = {
  mountTo(element: HTMLElement): void;
  addElement(block: unknown): void;
  clear(): void;
};

type FloDownApi = {
  FloDown: {
    fromUri(uri: string): FloDownBlock;
  };
  setBackendUrl(url: string): void;
};

declare global {
  interface Window {
    floDown?: (() => Promise<void>) & FloDownApi;
  }
}

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app element");

app.innerHTML = `
  <section class="viewer">
    <h1>Minimal FTML Viewer</h1>
    <p id="status">Loading FloDown…</p>
    <div id="content"></div>
  </section>
`;

const status = document.querySelector<HTMLParagraphElement>("#status");
const content = document.querySelector<HTMLDivElement>("#content");
if (!status || !content) throw new Error("Viewer elements are missing");

let activeDocument: FloDownBlock | null = null;

async function loadFloDown(): Promise<FloDownApi> {
  if (window.floDown?.FloDown) {
    window.floDown.setBackendUrl(MATHHUB_BACKEND);
    return window.floDown;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/flodown/flodown.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load FloDown"));
    document.head.appendChild(script);
  });

  if (!window.floDown) throw new Error("FloDown did not initialize");
  await window.floDown();
  window.floDown.setBackendUrl(MATHHUB_BACKEND);
  return window.floDown;
}

async function render() {
  try {
    const floDown = await loadFloDown();
    const documentUri =
      "http://mathhub.info?a=no/archive&d=ftml-viewer-minimal&l=en";
    const fd = floDown.FloDown.fromUri(documentUri);
    activeDocument?.clear();
    activeDocument = fd;
    fd.mountTo(content);
    fd.addElement({
      type: "paragraph",
      content: [
        "This is a reference to ",
        {
          type: "symref",
          uri: AUTO_COMPUTATION_SYMBOL_URI,
          content: ["Auto Computation"],
        },
        ". Click or hover the term to inspect its definition.",
      ],
    });
    status.textContent = "The MathHub definition is ready.";
  } catch (error) {
    console.error(error);
    status.textContent = "Could not load the MathHub definition.";
  }
}

void render();
