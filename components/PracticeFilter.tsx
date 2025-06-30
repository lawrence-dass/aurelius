"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { practices } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const PracticeFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("practice") || "";

    const [practice, setPractice] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if (practice === "") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["practice"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "practice",
                value: practice,
            });
        }
        router.push(newUrl, { scroll: false });
    }, [practice, router, searchParams]);

    return (
        <Select onValueChange={setPractice} value={practice}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Practice" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All practices</SelectItem>
                {Object.keys(practices).map((practice) => (
                    <SelectItem key={practice} value={practice} className="capitalize">
                        {practices[practice as keyof typeof practices] as string}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default PracticeFilter;