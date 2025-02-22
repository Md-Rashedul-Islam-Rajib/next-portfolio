import Introduction from "@/components/shared/home/Introduction";
import Projects from "@/components/shared/home/Projects";
import DownloadResume from "@/components/shared/home/ResumeDownload";
import Skills from "@/components/shared/home/Skills";
// import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    // <div className="!max-w-full">
    //   <WavyBackground className="w-full min-h-screen px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
    //     <Introduction />

    //     <div className="my-5">
    //       <Skills />
    //     </div>

    //     <DownloadResume />
    //   </WavyBackground>
    // </div>

    <div className="my-8">
      <Introduction />
      <Skills />
      <Projects/>
      <DownloadResume/>
    </div>
  );
}
