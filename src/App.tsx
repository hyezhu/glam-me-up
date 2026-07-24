import { useState } from "react";
import Header from "./components/Header";
import ProgressSteps from "./components/ProgressSteps";
import OccasionStep from "./components/OccasionStep";
import PhotoUploadStep from "./components/PhotoUploadStep";
import DetailsStep from "./components/DetailsStep";
import ReviewStep from "./components/ReviewStep";
import LoadingScreen from "./components/LoadingScreen";
import ErrorPanel from "./components/ErrorPanel";
import ResultsDashboard from "./components/results/ResultsDashboard";
import { analyzeStyle } from "./lib/api";
import type { Occasion, StyleAnalysis, StyleContext, UploadedPhoto, WizardStep } from "./types";

const DEFAULT_CONTEXT: StyleContext = {
  formality: 3,
  season: "Fall",
  venue: "Indoor",
  timeOfDay: "Evening",
  colorsToAvoid: "",
  notes: "",
};

export default function App() {
  const [step, setStep] = useState<WizardStep>("occasion");
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [context, setContext] = useState<StyleContext>(DEFAULT_CONTEXT);
  const [analysis, setAnalysis] = useState<StyleAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  function selectOccasion(o: Occasion) {
    setOccasion(o);
    setContext((c) => ({ ...c, formality: o.defaultFormality }));
  }

  async function submit() {
    if (!occasion) return;
    setStep("loading");
    try {
      const result = await analyzeStyle(occasion, context, photos);
      setAnalysis(result);
      setStep("results");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStep("error");
    }
  }

  function startOver() {
    setStep("occasion");
    setOccasion(null);
    setPhotos([]);
    setContext(DEFAULT_CONTEXT);
    setAnalysis(null);
    setError(null);
  }

  return (
    <div className="min-h-screen">
      <Header />
      {step !== "results" && step !== "loading" && <ProgressSteps current={step} />}

      {step === "occasion" && (
        <OccasionStep selected={occasion} onSelect={selectOccasion} onNext={() => setStep("photos")} />
      )}

      {step === "photos" && (
        <PhotoUploadStep
          photos={photos}
          onChange={setPhotos}
          onNext={() => setStep("details")}
          onBack={() => setStep("occasion")}
        />
      )}

      {step === "details" && occasion && (
        <DetailsStep
          context={context}
          onChange={setContext}
          onNext={() => setStep("review")}
          onBack={() => setStep("photos")}
        />
      )}

      {step === "review" && occasion && (
        <ReviewStep
          occasion={occasion}
          context={context}
          photos={photos}
          onSubmit={submit}
          onBack={() => setStep("details")}
        />
      )}

      {step === "loading" && <LoadingScreen />}

      {step === "error" && <ErrorPanel message={error || "Unknown error"} onRetry={() => setStep("review")} />}

      {step === "results" && occasion && analysis && (
        <ResultsDashboard occasion={occasion} analysis={analysis} photos={photos} onStartOver={startOver} />
      )}
    </div>
  );
}
