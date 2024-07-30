import IconButton from "@/components/ui/IconButton";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

interface PaginationProps {
	pageSize: number;
	dataCount: number;
	currentPage: number;
	onNextPage: () => void;
	onPrevPage: () => void;
	onReset?: () => void;
}
export default function PaginationUI({
	pageSize,
	dataCount,
	currentPage,
	onNextPage,
	onPrevPage,
	onReset,
}: PaginationProps) {
	return (
		<>
			<div className="hidden md:flex gap-2 mx-auto py-2">

				<IconButton
					icon={<HiChevronDoubleLeft />}
					ariaLabel="prev"
					disabled={currentPage === 1}
					onClick={onPrevPage}
				/>

				<span className="rounded-md border border-gray-300 px-3 flex items-center justify-between">{currentPage}</span>


				<IconButton
					className={`self-end ${currentPage === dataCount ? 'hover:cursor-not-allowed': ''}`}
					icon={<HiChevronDoubleRight />}
					disabled={currentPage === dataCount}
					ariaLabel="next"
					onClick={onNextPage}
				/>
			</div>
		</>
	);
}
