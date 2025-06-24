import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Share, Upload } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 py-24 md:py-32 relative">
      <div className="container flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <div className="mb-6 p-4 rounded-full bg-teal-500">
            <Package className="text-white h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-teal-600">
            Asset Management Platform
          </h1>
        </div>
        <p className="mt-6 max-w-[600px] text-lg text-slate-700">
          Upload, manage and share your digital assets with ease.
        </p>
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          <Link href="/gallery">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6">
              Browse Gallery
            </Button>
          </Link>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <Card className="shadow">
            <CardHeader className="pb-2 flex flex-col items-center">
              <div className="p-3 rounded-full bg-teal-100 mb-2">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-center">
                Organize
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-slate-500">
                Categorize and tag your assets
              </p>
            </CardContent>
          </Card>
          <Card className="shadow">
            <CardHeader className="pb-2 flex flex-col items-center">
              <div className="p-3 rounded-full bg-teal-100 mb-2">
                <Upload className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-center">
                Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-slate-500">Upload your assets</p>
            </CardContent>
          </Card>
          <Card className="shadow">
            <CardHeader className="pb-2 flex flex-col items-center">
              <div className="p-3 rounded-full bg-teal-100 mb-2">
                <Share className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-center">
                Share
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-slate-500">Share your assets</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
