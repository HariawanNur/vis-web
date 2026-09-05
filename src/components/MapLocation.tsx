"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { App } from "antd";
import MapGL, {
  Marker,
  NavigationControl,
  MapRef,
  type ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { createStyles } from "antd-style";
import { Icon, type IconName } from "./Icon";
import { useI18n, type TranslationKey } from "@/i18n";
import { designSystem } from "@/theme/antd-theme";
import { getCapitalCoords } from "@/lib/capital-coords";

export type CategoryType =
  | "all"
  | "tourism"
  | "restaurant"
  | "cafe"
  | "hotel"
  | "shopping"
  | "hospital"
  | "pharmacy"
  | "school"
  | "bank"
  | "atm"
  | "gas_station"
  | "park"
  | "airport"
  | "place_of_worship"
  | "office"
  | "train_station"
  | "bus_station"
  | "police"
  | "post_office";

export interface LocationItem {
  id: string | number;
  title: string;
  description?: string;
  info?: string;
  category: CategoryType;
  latitude: number;
  longitude: number;
  count?: number;
  status?: "on_track" | "attention" | "delayed" | "completed" | "inactive";
  statusLabel?: string;
  progress?: number;
  targetDate?: string;
  managerName?: string;
  imageUri?: string;
  markerColor?: string;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface ReverseGeocodeResponse {
  address?: {
    country_code?: string;
  };
}

const CATEGORY_META: Record<
  CategoryType,
  { labelKey: TranslationKey; icon: IconName; accent: string }
> = {
  all: {
    labelKey: "mapLocation.categories.all",
    icon: "AppstoreOutlined",
    accent: designSystem.palette.primary,
  },
  tourism: {
    labelKey: "mapLocation.categories.tourism",
    icon: "EnvironmentOutlined",
    accent: designSystem.palette.primary,
  },
  restaurant: {
    labelKey: "mapLocation.categories.restaurant",
    icon: "CoffeeOutlined",
    accent: designSystem.palette.secondary,
  },
  cafe: {
    labelKey: "mapLocation.categories.cafe",
    icon: "CoffeeOutlined",
    accent: designSystem.palette.secondary,
  },
  hotel: {
    labelKey: "mapLocation.categories.hotel",
    icon: "HomeOutlined",
    accent: designSystem.palette.success,
  },
  shopping: {
    labelKey: "mapLocation.categories.shopping",
    icon: "ShoppingOutlined",
    accent: designSystem.palette.warning,
  },
  hospital: {
    labelKey: "mapLocation.categories.hospital",
    icon: "MedicineBoxOutlined",
    accent: designSystem.palette.error,
  },
  pharmacy: {
    labelKey: "mapLocation.categories.pharmacy",
    icon: "MedicineBoxOutlined",
    accent: designSystem.palette.error,
  },
  school: {
    labelKey: "mapLocation.categories.school",
    icon: "ReadOutlined",
    accent: designSystem.palette.primary,
  },
  bank: {
    labelKey: "mapLocation.categories.bank",
    icon: "BankOutlined",
    accent: designSystem.palette.textSecondary,
  },
  atm: {
    labelKey: "mapLocation.categories.atm",
    icon: "CreditCardOutlined",
    accent: designSystem.palette.textSecondary,
  },
  gas_station: {
    labelKey: "mapLocation.categories.gasStation",
    icon: "CarOutlined",
    accent: designSystem.palette.textSecondary,
  },
  park: {
    labelKey: "mapLocation.categories.park",
    icon: "EnvironmentOutlined",
    accent: designSystem.palette.success,
  },
  airport: {
    labelKey: "mapLocation.categories.airport",
    icon: "GlobalOutlined",
    accent: designSystem.palette.primary,
  },
  place_of_worship: {
    labelKey: "mapLocation.categories.placeOfWorship",
    icon: "HomeOutlined",
    accent: designSystem.palette.textSecondary,
  },
  office: {
    labelKey: "mapLocation.categories.office",
    icon: "ShopOutlined",
    accent: designSystem.palette.primary,
  },
  train_station: {
    labelKey: "mapLocation.categories.trainStation",
    icon: "CarOutlined",
    accent: designSystem.palette.textSecondary,
  },
  bus_station: {
    labelKey: "mapLocation.categories.busStation",
    icon: "CarOutlined",
    accent: designSystem.palette.textSecondary,
  },
  police: {
    labelKey: "mapLocation.categories.police",
    icon: "SafetyOutlined",
    accent: designSystem.palette.error,
  },
  post_office: {
    labelKey: "mapLocation.categories.postOffice",
    icon: "MailOutlined",
    accent: designSystem.palette.warning,
  },
};

export const getCategoryIcon = (category: CategoryType | "all"): IconName => {
  return CATEGORY_META[category as CategoryType]?.icon ?? "EnvironmentOutlined";
};

const INITIAL_CENTER = {
  latitude: -6.175392,
  longitude: 106.827153,
  zoom: 12,
};

const DEFAULT_PADDING = { top: 0, bottom: 0, left: 0, right: 0 };

type ViewportState = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  padding: typeof DEFAULT_PADDING;
  width: number;
  height: number;
};

const createViewState = (
  latitude: number,
  longitude: number,
  zoom: number,
): ViewportState => ({
  latitude,
  longitude,
  zoom,
  bearing: 0,
  pitch: 0,
  padding: DEFAULT_PADDING,
  width: 0,
  height: 0,
});

const COUNTRY_CAPITAL_CACHE = new Map<
  string,
  { latitude: number; longitude: number; zoom: number }
>();

const CATEGORY_ORDER: CategoryType[] = [
  "all",
  "tourism",
  "restaurant",
  "cafe",
  "hotel",
  "shopping",
  "hospital",
  "pharmacy",
  "school",
  "bank",
  "atm",
  "gas_station",
  "park",
  "airport",
  "place_of_worship",
  "office",
  "train_station",
  "bus_station",
  "police",
  "post_office",
];

const resolveCountryCode = async (latitude: number, longitude: number) => {
  const searchParams = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: "jsonv2",
    addressdetails: "1",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${searchParams.toString()}`,
  );
  if (!response.ok) return null;

  const data = (await response
    .json()
    .catch(() => null)) as ReverseGeocodeResponse | null;
  return data?.address?.country_code?.toUpperCase() ?? null;
};

const resolveCapitalCenter = async (countryCode: string) => {
  const cached = COUNTRY_CAPITAL_CACHE.get(countryCode);
  if (cached) return cached;

  const data = getCapitalCoords(countryCode);
  COUNTRY_CAPITAL_CACHE.set(countryCode, data);
  return data;
};

export interface MapLocationProps {
  height?: number;
  compact?: boolean;
  preview?: boolean;
  locations?: LocationItem[];
  center?: { latitude: number; longitude: number; zoom?: number };
  activeLocationId?: string | number | null;
  onActiveLocationIdChange?: (locationId: string | number | null) => void;
  onLocationAction?: (location: LocationItem) => void;
  locationActionLabel?: string;
  legendItems?: Array<{ label: string; description?: string; color: string }>;
  showCategoryBar?: boolean;
}

type OverlayPosition = {
  left: number;
  top: number;
  placement: "top" | "bottom" | "left" | "right";
  pointerX: number;
  pointerY: number;
};

type MapLike = {
  project: (lngLat: [number, number]) => { x: number; y: number };
  getCanvas: () => { clientWidth: number; clientHeight: number } | null;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const calculateOverlayPosition = (
  map: MapLike | null | undefined,
  point: { longitude: number; latitude: number },
  type: "tooltip" | "popup",
): OverlayPosition | null => {
  const canvas = map?.getCanvas();
  if (!map || !canvas) return null;

  const projected = map.project([point.longitude, point.latitude]);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const overlayWidth = type === "tooltip" ? 220 : 300;
  const overlayHeight = type === "tooltip" ? 106 : 220;
  const gap = 14;

  const spaces = {
    top: projected.y - overlayHeight - gap,
    bottom: height - projected.y - overlayHeight - gap,
    left: projected.x - overlayWidth - gap,
    right: width - projected.x - overlayWidth - gap,
  };

  let placement: "top" | "bottom" | "left" | "right" = "top";
  if (type === "tooltip") {
    if (spaces.top >= 16) placement = "top";
    else if (spaces.bottom >= 16) placement = "bottom";
    else if (spaces.right >= 16) placement = "right";
    else placement = "left";
  } else {
    if (spaces.top >= 16) placement = "top";
    else if (spaces.right >= 16) placement = "right";
    else if (spaces.left >= 16) placement = "left";
    else placement = "bottom";
  }

  if (placement === "top") {
    const left = clamp(projected.x - overlayWidth / 2, 16, width - overlayWidth - 16);
    return {
      left,
      top: clamp(projected.y - overlayHeight - gap, 16, height - overlayHeight - 16),
      placement,
      pointerX: clamp(projected.x - left, 22, overlayWidth - 22),
      pointerY: overlayHeight,
    };
  }

  if (placement === "bottom") {
    const left = clamp(projected.x - overlayWidth / 2, 16, width - overlayWidth - 16);
    return {
      left,
      top: clamp(projected.y + gap, 16, height - overlayHeight - 16),
      placement,
      pointerX: clamp(projected.x - left, 22, overlayWidth - 22),
      pointerY: 0,
    };
  }

  if (placement === "left") {
    const top = clamp(projected.y - overlayHeight / 2, 16, height - overlayHeight - 16);
    return {
      left: clamp(projected.x - overlayWidth - gap, 16, width - overlayWidth - 16),
      top,
      placement,
      pointerX: overlayWidth,
      pointerY: clamp(projected.y - top, 18, overlayHeight - 18),
    };
  }

  const top = clamp(projected.y - overlayHeight / 2, 16, height - overlayHeight - 16);
  return {
    left: clamp(projected.x + gap, 16, width - overlayWidth - 16),
    top,
    placement,
    pointerX: 0,
    pointerY: clamp(projected.y - top, 18, overlayHeight - 18),
  };
};

const useStyles = createStyles(({ css }, params: { height: number }) => ({
  container: css`
    position: relative;
    width: 100%;
    height: ${params.height}px;
    min-height: 100%;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    background: #f8fafc;

    .maplibregl-popup-content {
      padding: 8px;
      border-radius: 12px;
    }

    .maplibregl-ctrl-attrib {
      font-size: 10px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 4px;
      padding: 2px 6px;
      display: none !important;
    }
  `,
  searchWrap: css`
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 10;
    width: 320px;
    max-width: calc(100% - 2rem);
  `,
  searchForm: css`
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    padding: 6px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1);
    border: 1px solid rgba(226, 232, 240, 0.8);
  `,
  searchInput: css`
    width: 100%;
    padding: 8px 12px;
    font-size: 13px;
    background: transparent;
    outline: none;
    border: none;
    color: #1e293b;

    &::placeholder {
      color: #94a3b8;
    }
  `,
  searchButton: css`
    background: #0d2b68;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;

    &:hover {
      background: rgba(13, 43, 104, 0.9);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  searchResults: css`
    margin-top: 8px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1);
    max-height: 224px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin-left: 0;
    font-size: 12px;
  `,
  searchResultItem: css`
    padding: 10px;
    cursor: pointer;
    color: #334155;
    transition: background 0.2s;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #ebf1ff;
    }
  `,
  categoryBar: css`
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    padding: 6px;
    border-radius: 16px;
    box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1);
    border: 1px solid rgba(226, 232, 240, 0.8);
    max-width: calc(100% - 2rem);
    overflow-x: auto;
  `,
  categoryButton: css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
    background: transparent;
    color: #64748b;

    &:hover {
      background: #f1f5f9;
    }
  `,
  categoryButtonActive: css`
    background: #0d2b68;
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.1);
    transform: scale(1.05);

    &:hover {
      background: #0d2b68;
    }
  `,
  geoButton: css`
    position: absolute;
    top: 16px;
    right: 56px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    color: #334155;
    padding: 10px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1);
    border: 1px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
    line-height: 1;

    &:hover {
      background: #ffffff;
    }

    &:active {
      transform: scale(0.95);
    }
  `,
  markerDot: css`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  `,
  markerDotWisata: css`
    background: #0d2b68;
    color: #ffffff;
  `,
  markerDotKuliner: css`
    background: #f5a623;
    color: #ffffff;
  `,
  markerDotHotel: css`
    background: #00a86b;
    color: #ffffff;
  `,
  markerDotDefault: css`
    background: #64748b;
    color: #ffffff;
  `,
  pinMarker: css`
    position: relative;
    width: 34px;
    height: 34px;
    border-radius: 12px 12px 14px 14px;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.22);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background: #123b7a;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -7px;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      background: inherit;
      clip-path: polygon(50% 100%, 0 0, 100% 0);
    }
  `,
  pinMarkerHover: css`
    transform: scale(1.12);
  `,
  pinMarkerSelected: css`
    transform: scale(1.18);
    box-shadow:
      0 0 0 3px rgba(13, 43, 104, 0.18),
      0 4px 10px rgba(15, 23, 42, 0.26);
  `,
  pinMarkerCluster: css`
    width: 38px;
    height: 38px;
    font-size: 12px;
    font-weight: 800;
  `,
  pinIcon: css`
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,
  pinStatusDot: css`
    position: absolute;
    top: 4px;
    right: 4px;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    border: 1px solid #ffffff;
    z-index: 2;
  `,
  pinCount: css`
    position: relative;
    z-index: 1;
    line-height: 1;
  `,
  popupContent: css`
    padding: 4px;
    max-width: 320px;
    color: #1e293b;
  `,
  tooltipContent: css`
    width: 220px;
    padding: 2px 0;
  `,
  tooltipTitle: css`
    margin: 0;
    font-size: 11px;
    font-weight: 800;
    color: #1e293b;
    line-height: 1.35;
  `,
  tooltipLocation: css`
    margin: 2px 0 0;
    font-size: 9px;
    color: #64748b;
    line-height: 1.4;
  `,
  tooltipMetaRow: css`
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  `,
  tooltipStatus: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    color: #334155;
  `,
  tooltipPercent: css`
    font-size: 10px;
    font-weight: 800;
    color: #0d2b68;
  `,
  tooltipProgress: css`
    margin-top: 10px;
    width: 100%;
    height: 6px;
    border-radius: 999px;
    overflow: hidden;
    background: #ebf1ff;
  `,
  tooltipProgressFill: css`
    height: 100%;
    border-radius: 999px;
    background: #0d2b68;
  `,
  previewCard: css`
    width: 250px;
    color: #1e293b;
  `,
  previewHeader: css`
    display: flex;
    align-items: flex-start;
    gap: 12px;
  `,
  previewThumb: css`
    width: 56px;
    height: 56px;
    border-radius: 12px;
    overflow: hidden;
    flex-shrink: 0;
    background: #ebf1ff;
  `,
  previewTitle: css`
    margin: 0;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.35;
    color: #1e293b;
  `,
  previewLocation: css`
    margin: 2px 0 0;
    font-size: 9px;
    color: #64748b;
    line-height: 1.4;
  `,
  previewSection: css`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  previewLabel: css`
    font-size: 9px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  `,
  previewValue: css`
    font-size: 10px;
    font-weight: 700;
    color: #1e293b;
  `,
  previewProgressBar: css`
    width: 100%;
    height: 7px;
    border-radius: 999px;
    overflow: hidden;
    background: #ebf1ff;
  `,
  previewProgressFill: css`
    height: 100%;
    border-radius: 999px;
    background: #0d2b68;
  `,
  previewAction: css`
    height: 34px;
    border-radius: 10px;
    font-weight: 700;
    padding-inline: 14px;
  `,
  overlay: css`
    position: absolute;
    z-index: 12;
    pointer-events: auto;
  `,
  overlayTooltip: css`
    width: 220px;
  `,
  overlayPopup: css`
    width: 300px;
  `,
  legendBar: css`
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 16px;
    z-index: 9;
    display: flex;
    gap: 12px;
    align-items: stretch;
    overflow-x: auto;
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  `,
  legendItem: css`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    min-width: 160px;
    flex-shrink: 0;
  `,
  legendMarker: css`
    width: 12px;
    height: 12px;
    border-radius: 999px;
    margin-top: 3px;
    flex-shrink: 0;
  `,
  legendTitle: css`
    margin: 0;
    font-size: 10px;
    font-weight: 800;
    color: #1e293b;
    line-height: 1.3;
  `,
  legendDesc: css`
    margin: 2px 0 0;
    font-size: 9px;
    color: #64748b;
    line-height: 1.35;
  `,
  overlayPointer: css`
    position: absolute;
    background: #ffffff;
  `,
  overlayPointerTop: css`
    left: 50%;
    top: -7px;
    width: 14px;
    height: 8px;
    transform: translateX(-50%) rotate(180deg);
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  `,
  overlayPointerBottom: css`
    left: 50%;
    bottom: -7px;
    width: 14px;
    height: 8px;
    transform: translateX(-50%);
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  `,
  overlayPointerLeft: css`
    left: -7px;
    top: 50%;
    width: 8px;
    height: 14px;
    transform: translateY(-50%) rotate(90deg);
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  `,
  overlayPointerRight: css`
    right: -7px;
    top: 50%;
    width: 8px;
    height: 14px;
    transform: translateY(-50%) rotate(-90deg);
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  `,
  popupHeader: css`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
  `,
  popupCategory: css`
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #0d2b68;
    background: #ebf1ff;
    padding: 2px 6px;
    border-radius: 4px;
  `,
  popupTitle: css`
    font-weight: 600;
    font-size: 12px;
    color: #1e293b;
    margin: 0 0 4px;
  `,
  popupDescription: css`
    font-size: 9px;
    color: #64748b;
    line-height: 1.5;
    margin: 0 0 8px;
  `,
  emptyState: css`
    position: absolute;
    inset: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: linear-gradient(
      180deg,
      rgba(248, 250, 252, 0.95) 0%,
      rgba(235, 241, 255, 0.95) 100%
    );
    backdrop-filter: blur(4px);
    text-align: center;
    padding: 24px;
  `,
  emptyIcon: css`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #ebf1ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0d2b68;
  `,
  emptyTitle: css`
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.4;
  `,
  emptyDesc: css`
    margin: 0;
    font-size: 12px;
    color: #64748b;
    line-height: 1.5;
    max-width: 260px;
  `,
  emptyButton: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
    background: #0d2b68;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: rgba(13, 43, 104, 0.9);
    }
  `,
  mapLoadingOverlay: css`
    position: absolute;
    inset: 0;
    z-index: 6;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 18px;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(248, 250, 252, 0.78) 0%,
      rgba(248, 250, 252, 0.15) 100%
    );
  `,
  mapLoadingBar: css`
    width: min(320px, calc(100% - 32px));
    height: 6px;
    border-radius: 999px;
    overflow: hidden;
    background: #ebf1ff;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  `,
  mapLoadingFill: css`
    height: 100%;
    border-radius: 999px;
    background: #0d2b68;
    transition: width 180ms ease;
  `,
}));

export function MapLocation({
  height = 600,
  compact = false,
  preview = false,
  locations = [],
  center = INITIAL_CENTER,
  activeLocationId,
  onActiveLocationIdChange,
  onLocationAction,
  locationActionLabel,
  legendItems,
  showCategoryBar = false,
}: MapLocationProps) {
  const { styles, cx } = useStyles({ height });
  const { message } = App.useApp();
  const { t } = useI18n();
  const mapRef = useRef<MapRef>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [activeLocation, setActiveLocation] = useState<LocationItem | null>(
    null,
  );
  const [hoveredLocationId, setHoveredLocationId] = useState<
    string | number | null
  >(null);
  const hoverTimerRef = useRef<number | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [mapKey, setMapKey] = useState(0);
  const [interactiveViewState, setInteractiveViewState] =
    useState<ViewportState>(
      createViewState(
        center.latitude,
        center.longitude,
        center.zoom ?? INITIAL_CENTER.zoom,
      ),
    );
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapLoadProgress, setMapLoadProgress] = useState(0);
  const [hoveredOverlayPosition, setHoveredOverlayPosition] = useState<OverlayPosition | null>(null);
  const [activeOverlayPosition, setActiveOverlayPosition] = useState<OverlayPosition | null>(null);
  const fitBoundsSignature = useMemo(
    () =>
      locations
        .map((item) => `${item.id}:${item.latitude}:${item.longitude}`)
        .join("|"),
    [locations],
  );
  const activeLocations = useMemo(() => {
    return locations.filter(
      (item) =>
        Number.isFinite(item.latitude) &&
        Number.isFinite(item.longitude) &&
        (typeof item.count !== "number" || item.count > 0),
    );
  }, [locations]);

  useEffect(() => {
    if (activeLocationId === undefined) return;
    if (activeLocationId === null) {
      setActiveLocation(null);
      return;
    }

    const nextActive =
      locations.find((item) => item.id === activeLocationId) ?? null;
    setActiveLocation(nextActive);
  }, [activeLocationId, locations]);

  const clusterZoom = Math.max(
    0,
    Math.min(
      20,
      Number(
        (preview
          ? (center.zoom ?? INITIAL_CENTER.zoom)
          : interactiveViewState.zoom) ?? INITIAL_CENTER.zoom,
      ),
    ),
  );

  useEffect(() => {
    if (!isMapReady || activeLocationId != null || locations.length === 0)
      return;

    const bounds = locations.reduce(
      (acc, item) => {
        if (!Number.isFinite(item.latitude) || !Number.isFinite(item.longitude))
          return acc;
        acc.minLat = Math.min(acc.minLat, item.latitude);
        acc.maxLat = Math.max(acc.maxLat, item.latitude);
        acc.minLon = Math.min(acc.minLon, item.longitude);
        acc.maxLon = Math.max(acc.maxLon, item.longitude);
        return acc;
      },
      {
        minLat: Number.POSITIVE_INFINITY,
        maxLat: Number.NEGATIVE_INFINITY,
        minLon: Number.POSITIVE_INFINITY,
        maxLon: Number.NEGATIVE_INFINITY,
      },
    );

    if (
      !Number.isFinite(bounds.minLat) ||
      !Number.isFinite(bounds.maxLat) ||
      !Number.isFinite(bounds.minLon) ||
      !Number.isFinite(bounds.maxLon)
    ) {
      return;
    }

    const map = mapRef.current;
    if (!map) return;

    if (locations.length === 1) {
      map.flyTo({
        center: [locations[0].longitude, locations[0].latitude],
        zoom: Math.max(center.zoom ?? INITIAL_CENTER.zoom, 11),
        duration: 900,
      });
      return;
    }

    map.fitBounds(
      [
        [bounds.minLon, bounds.minLat],
        [bounds.maxLon, bounds.maxLat],
      ],
      {
        padding: { top: 56, bottom: 56, left: 56, right: 56 },
        maxZoom: 10,
        duration: 900,
      },
    );
  }, [activeLocationId, center.zoom, isMapReady, locations]);

  useEffect(() => {
    if (activeLocationId === undefined || activeLocationId === null) return;
    if (!isMapReady) return;

    const nextActive = locations.find((item) => item.id === activeLocationId);
    if (!nextActive) return;

    mapRef.current?.flyTo({
      center: [nextActive.longitude, nextActive.latitude],
      zoom: Math.max(clusterZoom + 2, 15),
      duration: 750,
    });
  }, [activeLocationId, clusterZoom, isMapReady, locations]);

  const mapPoints = useMemo(() => {
    const clusters: Array<
      | {
          type: "cluster";
          key: string;
          latitude: number;
          longitude: number;
          count: number;
          status: LocationItem["status"];
          statusLabel?: string;
          items: LocationItem[];
        }
      | {
          type: "point";
          key: string;
          latitude: number;
          longitude: number;
          count: number;
          status: LocationItem["status"];
          statusLabel?: string;
          item: LocationItem;
        }
    > = [];

    if (activeLocations.length === 0) return clusters;

    const shouldCluster = activeLocations.length > 1 && clusterZoom < 15;
    if (!shouldCluster) {
      return activeLocations.map((item, index) => ({
        type: "point" as const,
        key: `${item.id}-${index}`,
        latitude: item.latitude,
        longitude: item.longitude,
        count: Math.max(1, item.count ?? 1),
        status: item.status,
        statusLabel: item.statusLabel,
        item,
      }));
    }

    const worldSize = 512 * 2 ** clusterZoom;
    const clusterRadius = 84;
    const buckets = new Map<string, LocationItem[]>();

    for (const item of activeLocations) {
      const x = ((item.longitude + 180) / 360) * worldSize;
      const sinLat = Math.sin((item.latitude * Math.PI) / 180);
      const y =
        (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) *
        worldSize;
      const bucketX = Math.floor(x / clusterRadius);
      const bucketY = Math.floor(y / clusterRadius);
      const key = `${bucketX}:${bucketY}`;
      const current = buckets.get(key) ?? [];
      current.push(item);
      buckets.set(key, current);
    }

    buckets.forEach((items, key) => {
      if (items.length === 1) {
        const item = items[0];
        clusters.push({
          type: "point",
          key: `${item.id}-${key}`,
          latitude: item.latitude,
          longitude: item.longitude,
          count: Math.max(1, item.count ?? 1),
          status: item.status,
          statusLabel: item.statusLabel,
          item,
        });
        return;
      }

      const totalWeight = items.reduce(
        (sum, item) => sum + Math.max(1, item.count ?? 1),
        0,
      );
      const statusWeight = new Map<
        NonNullable<LocationItem["status"]>,
        number
      >();
      const centerPoint = items.reduce(
        (acc, item) => {
          const weight = Math.max(1, item.count ?? 1);
          acc.latitude += item.latitude * weight;
          acc.longitude += item.longitude * weight;
          const status = item.status ?? "inactive";
          statusWeight.set(status, (statusWeight.get(status) ?? 0) + weight);
          return acc;
        },
        { latitude: 0, longitude: 0 },
      );

      const dominantStatus = [...statusWeight.entries()].sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0];

      clusters.push({
        type: "cluster",
        key,
        latitude: centerPoint.latitude / totalWeight,
        longitude: centerPoint.longitude / totalWeight,
        count: totalWeight,
        status: dominantStatus === "inactive" ? undefined : dominantStatus,
        statusLabel: undefined,
        items,
      });
    });

    return clusters;
  }, [activeLocations, clusterZoom]);

  const hoveredPoint = useMemo(() => {
    const point = mapPoints.find(
      (entry) => entry.type === "point" && entry.item.id === hoveredLocationId,
    );
    return point && point.type === "point" ? point : null;
  }, [hoveredLocationId, mapPoints]);

  const activePoint = useMemo(() => {
    if (!activeLocation) return null;
    const point = mapPoints.find(
      (entry) => entry.type === "point" && entry.item.id === activeLocation.id,
    );
    return point && point.type === "point" ? point : null;
  }, [activeLocation, mapPoints]);
  const getOverlayPointerStyle = (overlay: OverlayPosition) => {
    if (overlay.placement === "left" || overlay.placement === "right") {
      return { top: overlay.pointerY };
    }

    return { left: overlay.pointerX };
  };

  const statusMeta = (status?: LocationItem["status"]) => {
    switch (status) {
      case "on_track":
        return { color: designSystem.palette.success, label: t("project.status.onTrack") };
      case "attention":
        return { color: designSystem.palette.warning, label: t("project.status.attention") };
      case "delayed":
        return { color: designSystem.palette.error, label: t("project.status.delayed") };
      case "completed":
        return { color: designSystem.palette.textSecondary, label: t("project.status.completed") };
      case "inactive":
      default:
        return { color: designSystem.palette.textSecondary, label: t("project.status.inactive") };
    }
  };

  useEffect(() => {
    if (!isMapReady || !hoveredPoint || activeLocation) {
      setHoveredOverlayPosition(null);
      return;
    }

    const map = mapRef.current?.getMap();
    setHoveredOverlayPosition(
      calculateOverlayPosition(map, hoveredPoint, "tooltip"),
    );
  }, [activeLocation, hoveredPoint, interactiveViewState, isMapReady, mapKey]);

  useEffect(() => {
    if (!isMapReady || !activeLocation) {
      setActiveOverlayPosition(null);
      return;
    }

    const map = mapRef.current?.getMap();
    if (!map) {
      setActiveOverlayPosition(null);
      return;
    }

    const point = activePoint ?? activeLocation;
    const overlayType = activePoint ? "popup" : "tooltip";
    setActiveOverlayPosition(calculateOverlayPosition(map, point, overlayType));
  }, [activeLocation, activePoint, interactiveViewState, isMapReady, mapKey]);

  const getMarkerAccent = (item: LocationItem) =>
    item.markerColor ?? statusMeta(item.status).color;

  const resolvedLegendItems = useMemo(() => {
    if (legendItems && legendItems.length > 0) return legendItems;
    return [] as Array<{ label: string; description?: string; color: string }>;
  }, [legendItems]);

  const osmMapStyle = useMemo(
    () => ({
      version: 8,
      sources: {
        carto: {
          type: "raster",
          tiles: [
            "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
          ],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors © CARTO",
        },
      },
      layers: [
        {
          id: "carto",
          type: "raster",
          source: "carto",
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    setInteractiveViewState(
      createViewState(
        center.latitude,
        center.longitude,
        center.zoom ?? INITIAL_CENTER.zoom,
      ),
    );
    setMapKey((value) => value + 1);
    setIsMapReady(false);
    setIsMapLoading(true);
    setMapLoadProgress(0);
  }, [center.latitude, center.longitude, center.zoom]);

  useEffect(() => {
    if (center !== INITIAL_CENTER) return;

    let cancelled = false;

    const detectCountryCapital = async () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const countryCode = await resolveCountryCode(
              position.coords.latitude,
              position.coords.longitude,
            );
            if (!countryCode || cancelled) return;

            const capitalCenter = await resolveCapitalCenter(countryCode);
            if (!capitalCenter || cancelled) return;

            setInteractiveViewState(
              createViewState(
                capitalCenter.latitude,
                capitalCenter.longitude,
                capitalCenter.zoom,
              ),
            );
            setMapKey((value) => value + 1);
            setIsMapReady(false);
            setIsMapLoading(true);
            setMapLoadProgress(0);
          } catch {
            // keep default center
          }
        },
        () => {
          // keep default center
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
      );
    };

    void detectCountryCapital();

    return () => {
      cancelled = true;
    };
  }, [center]);

  useEffect(() => {
    if (!isMapLoading) return;

    const timer = window.setInterval(() => {
      setMapLoadProgress((value) => (value >= 90 ? value : value + 6));
    }, 120);

    return () => window.clearInterval(timer);
  }, [isMapLoading]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMapReady || locations.length === 0) return;

    const bounds = locations.reduce(
      (acc, item) => {
        if (!Number.isFinite(item.latitude) || !Number.isFinite(item.longitude))
          return acc;
        acc.minLat = Math.min(acc.minLat, item.latitude);
        acc.maxLat = Math.max(acc.maxLat, item.latitude);
        acc.minLon = Math.min(acc.minLon, item.longitude);
        acc.maxLon = Math.max(acc.maxLon, item.longitude);
        return acc;
      },
      {
        minLat: Number.POSITIVE_INFINITY,
        maxLat: Number.NEGATIVE_INFINITY,
        minLon: Number.POSITIVE_INFINITY,
        maxLon: Number.NEGATIVE_INFINITY,
      },
    );

    if (
      !Number.isFinite(bounds.minLat) ||
      !Number.isFinite(bounds.maxLat) ||
      !Number.isFinite(bounds.minLon) ||
      !Number.isFinite(bounds.maxLon)
    ) {
      return;
    }

    const map = mapRef.current;
    if (!map) return;

    if (locations.length === 1) {
      map.flyTo({
        center: [locations[0].longitude, locations[0].latitude],
        zoom: Math.max(center.zoom ?? INITIAL_CENTER.zoom, 11),
        duration: 1200,
      });
      return;
    }

    map.fitBounds(
      [
        [bounds.minLon, bounds.minLat],
        [bounds.maxLon, bounds.maxLat],
      ],
      {
        padding: { top: 56, bottom: 56, left: 56, right: 56 },
        maxZoom: 10,
        duration: 1200,
      },
    );
  }, [center.zoom, fitBoundsSignature, isMapReady, locations]);

  const handleSelectSearchResult = (result: NominatimResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    const newLocation: LocationItem = {
      id: `search-${result.place_id}`,
      title: result.display_name.split(",")[0],
      description: result.display_name,
      category: "tourism",
      latitude: lat,
      longitude: lon,
    };

    setActiveLocation(newLocation);
    setSearchResults([]);
    setSearchQuery("");
    mapRef.current?.flyTo({
      center: [lon, lat],
      zoom: 14,
      duration: 1800,
    });
  };

  const handleGetGeolocation = () => {
    if (!navigator.geolocation) {
      message.warning(t("mapLocation.geo.noSupport"));
      return;
    }

    message.loading({ content: t("mapLocation.geo.loading"), key: "geo" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        message.success({ content: t("mapLocation.geo.success"), key: "geo" });

        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 15,
          duration: 2000,
        });
      },
      (error) => {
        console.error("Error Geolocation:", error);
        const msg =
          error.code === 1
            ? t("mapLocation.geo.permissionDenied")
            : error.code === 2
              ? t("mapLocation.geo.unavailable")
              : t("mapLocation.geo.failed");
        message.error({ content: msg, key: "geo" });
      },
      { enableHighAccuracy: true },
    );
  };

  const getPinStyle = (): CSSProperties => {
    return { background: designSystem.palette.primary, color: designSystem.palette.white };
  };

  const handleViewStateEnd = (event: ViewStateChangeEvent) => {
    const next = event.viewState as ViewportState;
    setInteractiveViewState((current) => {
      if (
        current.latitude === next.latitude &&
        current.longitude === next.longitude &&
        current.zoom === next.zoom &&
        current.bearing === next.bearing &&
        current.pitch === next.pitch
      ) {
        return current;
      }
      return next;
    });
  };

  const mapInitialViewState = useMemo(
    () =>
      createViewState(
        center.latitude,
        center.longitude,
        center.zoom ?? INITIAL_CENTER.zoom,
      ),
    [center.latitude, center.longitude, center.zoom],
  );

  return (
    <div className={styles.container}>
      {!compact && (
        <>
          <div className={styles.searchWrap}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!searchQuery.trim()) return;

                setIsSearching(true);
                try {
                  const searchParams = new URLSearchParams({
                    q: searchQuery,
                    format: "json",
                    limit: "5",
                  });
                  const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?${searchParams.toString()}`,
                  );
                  const data: NominatimResult[] = await response.json();
                  setSearchResults(data);
                } catch (error) {
                  console.error("MapLocation-search-failed", error);
                } finally {
                  setIsSearching(false);
                }
              }}
              className={styles.searchForm}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("mapLocation.searchPlaceholder")}
                className={styles.searchInput}
              />
              <button
                type="submit"
                disabled={isSearching}
                className={styles.searchButton}
              >
                {isSearching
                  ? t("mapLocation.searching")
                  : t("mapLocation.search")}
              </button>
            </form>

            {searchResults.length > 0 && (
              <ul className={styles.searchResults}>
                {searchResults.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelectSearchResult(item)}
                    className={styles.searchResultItem}
                  >
                    <Icon type="EnvironmentOutlined" size={14} />
                    <span>{item.display_name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {showCategoryBar && (
            <div className={styles.categoryBar}>
              {CATEGORY_ORDER.map((catId) => {
                const cat = CATEGORY_META[catId];
                const isActive = selectedCategory === catId;
                return (
                  <button
                    key={catId}
                    onClick={() => {
                      setSelectedCategory(catId);
                      if (
                        activeLocation &&
                        catId !== "all" &&
                        activeLocation.category !== catId
                      ) {
                        setActiveLocation(null);
                      }
                    }}
                    className={cx(
                      styles.categoryButton,
                      isActive && styles.categoryButtonActive,
                    )}
                  >
                    <Icon type={cat.icon} size={14} />
                    <span>{t(cat.labelKey)}</span>
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={handleGetGeolocation}
            className={styles.geoButton}
            title={t("mapLocation.geo.button")}
            type="button"
          >
            <Icon type="AimOutlined" size={16} />
          </button>
        </>
      )}

      <MapGL
        key={mapKey}
        ref={mapRef}
        initialViewState={mapInitialViewState}
        {...(!preview ? { onMoveEnd: handleViewStateEnd } : {})}
        style={{ width: "100%", height: "100%" }}
        mapStyle={osmMapStyle as any}
        dragPan={!preview}
        dragRotate={false}
        scrollZoom={!preview}
        touchZoomRotate={!preview}
        keyboard={!preview}
        doubleClickZoom={!preview}
        boxZoom={!preview}
        cooperativeGestures={!preview}
        onLoad={() => {
          setIsMapReady(true);
          setMapLoadProgress(100);
          window.setTimeout(() => setIsMapLoading(false), 160);
        }}
      >
        {!compact && <NavigationControl position="top-right" />}

        {isMapLoading && (
          <div className={styles.mapLoadingOverlay}>
            <div className={styles.mapLoadingBar}>
              <div
                className={styles.mapLoadingFill}
                style={{ width: `${mapLoadProgress}%` }}
              />
            </div>
          </div>
        )}

        {mapPoints.map((point) => {
          const isCluster = point.type === "cluster";
          const selected = !isCluster && activeLocation?.id === point.item.id;
          const statusInfo = statusMeta(point.status);
          const markerAccent = isCluster
            ? statusInfo.color
            : getMarkerAccent(point.item);

          return (
            <Marker
              key={point.key}
              longitude={point.longitude}
              latitude={point.latitude}
              anchor="bottom"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isCluster) {
                    if (preview) return;
                    mapRef.current?.flyTo({
                      center: [point.longitude, point.latitude],
                      zoom: Math.min(clusterZoom + 2, 16),
                      duration: 900,
                    });
                    return;
                  }
                  setActiveLocation(point.item);
                  setHoveredLocationId(null);
                }}
                onMouseEnter={() => {
                  if (hoverTimerRef.current) {
                    window.clearTimeout(hoverTimerRef.current);
                    hoverTimerRef.current = null;
                  }
                  if (!isCluster && !activeLocation)
                    setHoveredLocationId(point.item.id);
                }}
                onMouseLeave={() => {
                  if (isCluster) return;
                  hoverTimerRef.current = window.setTimeout(() => {
                    setHoveredLocationId((current) =>
                      current === point.item.id ? null : current,
                    );
                    hoverTimerRef.current = null;
                  }, 120);
                }}
                className={cx(
                  styles.pinMarker,
                  isCluster && styles.pinMarkerCluster,
                  !isCluster && selected && styles.pinMarkerSelected,
                  !isCluster &&
                    hoveredLocationId === point.item.id &&
                    styles.pinMarkerHover,
                )}
                style={getPinStyle()}
                title={isCluster ? `${point.count} proyek` : point.item.title}
              >
                <span
                  className={styles.pinStatusDot}
                  style={{ background: markerAccent }}
                />
                {isCluster ? (
                  <span className={styles.pinCount}>{point.count}</span>
                ) : (
                  <Icon
                    type="ApartmentOutlined"
                    size={15}
                    className={styles.pinIcon}
                  />
                )}
              </button>
            </Marker>
          );
        })}

        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="center"
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "rgba(13, 43, 104, 0.4)",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  background: designSystem.palette.primary,
                  borderRadius: "50%",
                  border: `2px solid ${designSystem.palette.white}`,
                  boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.1)",
                }}
              />
            </div>
          </Marker>
        )}

        {hoveredPoint && !activeLocation && hoveredOverlayPosition && (
          <div
            className={cx(styles.overlay, styles.overlayTooltip)}
            style={{
              left: hoveredOverlayPosition.left,
              top: hoveredOverlayPosition.top,
              pointerEvents: "none",
            }}
          >
            <div
              className={styles.tooltipContent}
              style={{
                position: "relative",
                background: designSystem.palette.white,
                borderRadius: 12,
                border: `1px solid ${designSystem.palette.border}`,
                boxShadow: designSystem.elevation.card,
                padding: 10,
              }}
            >
              <div
                className={cx(
                  styles.overlayPointer,
                  hoveredOverlayPosition.placement === "top"
                    ? styles.overlayPointerBottom
                    : hoveredOverlayPosition.placement === "bottom"
                      ? styles.overlayPointerTop
                      : hoveredOverlayPosition.placement === "left"
                        ? styles.overlayPointerLeft
                        : styles.overlayPointerRight,
                )}
                style={getOverlayPointerStyle(hoveredOverlayPosition)}
              />
              <h4 className={styles.tooltipTitle}>{hoveredPoint.item.title}</h4>
              <p className={styles.tooltipLocation}>
                {hoveredPoint.item.info ?? hoveredPoint.item.description ?? hoveredPoint.item.title}
              </p>
              <div className={styles.tooltipMetaRow}>
                <span className={styles.tooltipStatus}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: statusMeta(hoveredPoint.item.status).color,
                      display: "inline-block",
                    }}
                  />
                  {hoveredPoint.item.statusLabel ?? statusMeta(hoveredPoint.item.status).label}
                </span>
                {typeof hoveredPoint.item.progress === "number" && (
                  <span className={styles.tooltipPercent}>{hoveredPoint.item.progress}%</span>
                )}
              </div>
              {typeof hoveredPoint.item.progress === "number" && (
                <div className={styles.tooltipProgress}>
                  <div
                    className={styles.tooltipProgressFill}
                    style={{
                      width: `${Math.max(0, Math.min(100, hoveredPoint.item.progress))}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/*
        {false &&
          activePoint &&
          (() => {
            const overlay = activeOverlayPosition;
            if (!overlay) return null;
            const pointerClass =
              overlay.placement === "top"
                ? styles.overlayPointerBottom
                : overlay.placement === "bottom"
                  ? styles.overlayPointerTop
                  : overlay.placement === "left"
                    ? styles.overlayPointerLeft
                    : styles.overlayPointerRight;
            return (
              <div
                className={cx(styles.overlay, styles.overlayPopup)}
                style={{ left: overlay.left, top: overlay.top }}
              >
                <div
                  className={styles.previewCard}
                  style={{
                    position: "relative",
                    background: designSystem.palette.white,
                    borderRadius: 16,
                    border: `1px solid ${designSystem.palette.border}`,
                    boxShadow: designSystem.elevation.card,
                    padding: 10,
                  }}
                >
                  <div
                    className={cx(styles.overlayPointer, pointerClass)}
                    style={getOverlayPointerStyle(overlay)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLocation(null);
                      onActiveLocationIdChange?.(null);
                    }}
                    aria-label="Close popup"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      border: "none",
                      background: "transparent",
                      color: designSystem.palette.textSecondary,
                      cursor: "pointer",
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    <Icon type="CloseOutlined" size={14} />
                  </button>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewThumb}>
                      {activePoint.item.imageUri ? (
                        <Image
                          src={activePoint.item.imageUri}
                          alt={activePoint.item.title}
                          fill
                          sizes="120px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: designSystem.palette.tintPrimary,
                            color: designSystem.palette.primary,
                          }}
                        >
                          <Icon type="ApartmentOutlined" size={18} />
                        </div>
                      )}
                    </div>
                    <div style={{ minWidth: 0, flex: 1, paddingRight: 24 }}>
                      <h4 className={styles.previewTitle}>
                        {activePoint.item.title}
                      </h4>
                      <p className={styles.previewLocation}>
                        {activePoint.item.info ??
                          activePoint.item.description ??
                          activePoint.item.title}
                      </p>
                    </div>
                  </div>

                  <div className={styles.previewSection}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span className={styles.tooltipStatus}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: statusMeta(activePoint.item.status)
                              .color,
                            display: "inline-block",
                          }}
                        />
                        {activePoint.item.statusLabel ??
                          statusMeta(activePoint.item.status).label}
                      </span>
                      {typeof activePoint.item.progress === "number" && (
                        <span className={styles.previewValue}>
                          {activePoint.item.progress}%
                        </span>
                      )}
                    </div>

                    {typeof activePoint.item.progress === "number" && (
                      <div className={styles.previewProgressBar}>
                        <div
                          className={styles.previewProgressFill}
                          style={{
                            width: `${Math.max(0, Math.min(100, activePoint.item.progress))}%`,
                          }}
                        />
                      </div>
                    )}

                    <div style={{ display: "grid", gap: 8 }}>
                      {activePoint.item.managerName && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 10,
                          }}
                        >
                          <span className={styles.previewLabel}>
                            {t("mapLocation.preview.managerAbbr")}
                          </span>
                          <span className={styles.previewValue}>
                            {activePoint.item.managerName}
                          </span>
                        </div>
                      )}
                      {activePoint.item.targetDate && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 10,
                          }}
                        >
                          <span className={styles.previewLabel}>
                            {t("mapLocation.preview.target")}
                          </span>
                          <span className={styles.previewValue}>
                            {activePoint.item.targetDate}
                          </span>
                        </div>
                      )}
                    </div>

                    {onLocationAction && (
                      <button
                        type="button"
                        onClick={() => onLocationAction(activePoint.item)}
                        style={{
                          marginTop: 4,
                          border: "none",
                          background: "transparent",
                          color: designSystem.palette.primary,
                          fontSize: 12,
                          fontWeight: 800,
                          textAlign: "right",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        {locationActionLabel ??
                          t("mapLocation.actions.viewProject")}{" "}
                        →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        */}

        {activeLocation &&
          activePoint &&
          activeOverlayPosition &&
          (() => {
            const overlay = activeOverlayPosition;
            const point = activePoint;
            const location = activeLocation;
            if (!overlay || !point || !location) return null;
            const pointerClass =
              overlay.placement === "top"
                ? styles.overlayPointerBottom
                : overlay.placement === "bottom"
                  ? styles.overlayPointerTop
                  : overlay.placement === "left"
                    ? styles.overlayPointerLeft
                    : styles.overlayPointerRight;
            return (
              <div
                className={cx(styles.overlay, styles.overlayTooltip)}
                style={{
                  left: overlay.left,
                  top: overlay.top,
                  pointerEvents: "auto",
                  zIndex: 14,
                }}
              >
                <div
                  className={styles.tooltipContent}
                  style={{
                    position: "relative",
                    width: "100%",
                    background: designSystem.palette.white,
                    borderRadius: 12,
                    border: `1px solid ${designSystem.palette.border}`,
                    boxShadow: designSystem.elevation.card,
                    padding: 12,
                  }}
                >
                  <div
                    className={cx(styles.overlayPointer, pointerClass)}
                    style={getOverlayPointerStyle(overlay)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setActiveLocation(null)
                      onActiveLocationIdChange?.(null)
                    }}
                    aria-label="Close popup"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      border: "none",
                      background: "transparent",
                      color: designSystem.palette.textSecondary,
                      cursor: "pointer",
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    <Icon type="CloseOutlined" size={14} />
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 22 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: statusMeta(location.status).color,
                        flexShrink: 0,
                      }}
                    />
                    <span className={styles.popupCategory}>
                      <Icon type={getCategoryIcon(location.category)} size={12} />
                      {t(CATEGORY_META[location.category]?.labelKey ?? CATEGORY_META.all.labelKey)}
                    </span>
                  </div>
                  <h4 className={styles.popupTitle} style={{ marginTop: 10 }}>{point.item.title}</h4>
                  {point.item.info || point.item.description ? (
                    <p className={styles.popupDescription}>
                      {point.item.info ?? point.item.description}
                    </p>
                  ) : null}
                  <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <span className={styles.tooltipStatus}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                        background: statusMeta(point.item.status).color,
                            display: "inline-block",
                          }}
                        />
                        {point.item.statusLabel ?? statusMeta(point.item.status).label}
                      </span>
                      <span className={styles.previewValue}>{point.item.progress ?? 0}%</span>
                    </div>
                    <div className={styles.previewProgressBar}>
                      <div
                        className={styles.previewProgressFill}
                        style={{ width: `${Math.max(0, Math.min(100, point.item.progress ?? 0))}%` }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <span className={styles.previewLabel}>{t("project.labels.target")}</span>
                      <span className={styles.previewValue}>{point.item.targetDate}</span>
                    </div>
                    {onLocationAction && (
                      <button
                        type="button"
                        onClick={() => onLocationAction(point.item)}
                        style={{
                          marginTop: 2,
                          border: "none",
                          background: "transparent",
                          color: designSystem.palette.primary,
                          fontSize: 12,
                          fontWeight: 800,
                          textAlign: "right",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        {locationActionLabel ?? t("mapLocation.actions.viewProject")} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
      </MapGL>

      {resolvedLegendItems.length > 0 && (
        <div
          className={styles.legendBar}
          style={showCategoryBar ? { bottom: 86 } : undefined}
        >
          {resolvedLegendItems.map((item) => (
            <div
              key={`${item.label}-${item.color}`}
              className={styles.legendItem}
            >
              <span
                className={styles.legendMarker}
                style={{ background: item.color }}
              />
              <div>
                <p className={styles.legendTitle}>{item.label}</p>
                {item.description && (
                  <p className={styles.legendDesc}>{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!compact && locations.length === 0 && !userLocation && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Icon type="EnvironmentOutlined" size={24} />
          </div>
          <p className={styles.emptyTitle}>{t("mapLocation.empty.title")}</p>
          <p className={styles.emptyDesc}>
            {t("mapLocation.empty.description")}
          </p>
          <button
            type="button"
            className={styles.emptyButton}
            onClick={handleGetGeolocation}
          >
            <Icon type="AimOutlined" size={14} />
            {t("mapLocation.empty.button")}
          </button>
        </div>
      )}
    </div>
  );
}
