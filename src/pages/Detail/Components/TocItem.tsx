import styled from "styled-components";
import PlayIcon from "@/assets/play.svg?react";
import { formatTimeRange } from "@/utils/formatter";
import DimmedArea from "./DimmedArea";
import { forwardRef } from "react";
import { formatSummary } from "@/utils/formatter";

interface TocItemProps {
	title: string;
	start: number;
	summary: string;
	thumbnails: string;
	tocItemHeight: number;
	dimmed?: boolean;
	onClick: () => void;
}

const TocItem = forwardRef<HTMLDivElement, TocItemProps>(
	({ title, start, summary, thumbnails, dimmed, tocItemHeight, onClick }, ref) => {
		return (
			<Container ref={ref}>
				<ContentWrapper $dimmed={dimmed}>
					<Title>{title}</Title>
					<Thumbnail onClick={onClick}>
						<img src={thumbnails} alt={title} />
						<PlayIcon className="play-icon" />
					</Thumbnail>
					<Timeline>
						<PlayIcon width={16} height={16} />
						<span>{formatTimeRange(start)}</span>
					</Timeline>
					<Summary>{formatSummary(summary)}</Summary>
				</ContentWrapper>
				{dimmed && <DimmedArea tocItemHeight={tocItemHeight} />}
			</Container>
		);
	}
);

export default TocItem;

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-top: 60px;
`;

const ContentWrapper = styled.div<{ $dimmed?: boolean }>`
	opacity: ${(props) => (props.$dimmed ? 0.8 : 1)};
`;

const Title = styled.span`
	font-size: 24px;
	font-weight: 600;
	line-height: 140%;
`;

const Thumbnail = styled.div`
	position: relative;
	margin-top: 12px;
	margin-bottom: 8px;
	display: flex;
	justify-content: center;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.play-icon {
		position: absolute;
		width: 40px;
		height: 40px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const Timeline = styled.div`
	display: flex;
	align-items: center;
	height: 18px;
	gap: 12px;
	margin-bottom: 24px;

	span {
		font-size: 14px;
		font-weight: 500;
		line-height: 16.71px;
	}
`;

const Summary = styled.div`
	font-size: 18px;
	font-weight: 400;
	line-height: 168%;
	margin-left: 8px;

	span {
		display: block;
	}

	span.line-break {
		font-weight: 400;
		line-height: 168%;
		margin-bottom: 12px;
	}
`;
