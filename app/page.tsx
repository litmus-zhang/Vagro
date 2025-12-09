"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import MapView from "@/components/MapView";
import TableView from "@/components/TableView";
import { countriesData } from "@/lib/countries-data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    return countriesData.filter((country) => {
      const matchesSearch =
        searchQuery === "" ||
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.localName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          World Countries Explorer
        </h1>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search by country name, code, or local name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <MapView filteredCountries={filteredCountries} />
          </TabsContent>

          <TabsContent value="table">
            <TableView filteredCountries={filteredCountries} />
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredCountries.length} of {countriesData.length} countries
        </div>

        <p className="mt-6 text-center text-sm">
          Made with ❤️ by <a className="font-bold" href="https://studio.dynage.technology">Dynage Studio</a>
        </p>
      </div>
    </div>
  );
}
