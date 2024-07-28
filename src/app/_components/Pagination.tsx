import IconButton from "@/components/ui/IconButton";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
			<div className="hidden md:flex gap-2 ml-auto ">
				<>
					{currentPage > 1 ? (
						<IconButton
							icon={<FaArrowLeft />}
							ariaLabel="prev"
							onClick={onPrevPage}
						/>
					) : null}
				</>

        <p>{currentPage}</p>

				<>
					{currentPage + 1 < Math.ceil(dataCount / pageSize) && (
						<IconButton
							className="self-end"
							icon={<FaArrowRight />}
							ariaLabel="next"
							onClick={onNextPage}
						/>
					)}
				</>
			</div>
      </>
	);
}
