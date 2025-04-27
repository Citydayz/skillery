import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import tools from "@/data/tools.json";

type Tool = {
  slug: string;
  title: string;
  description: string;
  component: string;
};

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () => {
  const toolsList: Tool[] = (await import("@/data/tools.json")).default;
  return toolsList.map(({ slug }) => ({ slug }));
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const toolsList: Tool[] = (await import("@/data/tools.json")).default;
  const tool = toolsList.find((t) => t.slug === slug);
  if (!tool) return { notFound: true };

  return {
    title: tool.title,
    description: tool.description,
  };
};

export default async function ToolPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tool = (tools as Tool[]).find((t) => t.slug === slug);
  if (!tool) return notFound();

  const ToolComponent = dynamic(
    () => import(`@/components/tools/${tool.component}`)
  );

  // 👇 On adapte la largeur dynamiquement selon le slug
  const wrapperClass =
    slug === "color-palette-generator"
      ? "w-full max-w-[90%]"
      : "w-full max-w-4xl";

  return (
    <main className="min-h-screen bg-[#f9fafb] text-gray-800 px-4 py-12 flex justify-center">
      <div className={wrapperClass}>
        <ToolComponent />
      </div>
    </main>
  );
}
