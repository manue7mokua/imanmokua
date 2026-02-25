declare module 'react-d3-tree' {
    import React from 'react';

    interface TreeNodeDatum {
        name: string;
        attributes?: Record<string, string | number>;
        children?: TreeNodeDatum[];
        [key: string]: unknown;
    }

    export interface TreeProps {
        data: TreeNodeDatum | TreeNodeDatum[];
        orientation?: 'horizontal' | 'vertical';
        translate?: { x: number; y: number };
        pathFunc?: 'diagonal' | 'elbow' | 'straight' | 'step';
        nodeSvgShape?: {
            shape?: string;
            shapeProps?: Record<string, unknown>;
        };
        nodeSize?: { x: number; y: number };
        separation?: { siblings: number; nonSiblings: number };
        collapsible?: boolean;
        initialDepth?: number;
        depthFactor?: number;
        zoomable?: boolean;
        zoom?: number;
        scaleExtent?: { min: number; max: number };
        nodeClassName?: string;
        onClick?: (nodeData: TreeNodeDatum, event: React.MouseEvent) => void;
        onMouseOver?: (nodeData: TreeNodeDatum, event: React.MouseEvent) => void;
        onMouseOut?: (nodeData: TreeNodeDatum, event: React.MouseEvent) => void;
        onLinkClick?: (linkData: unknown, event: React.MouseEvent) => void;
        onLinkMouseOver?: (linkData: unknown, event: React.MouseEvent) => void;
        onLinkMouseOut?: (linkData: unknown, event: React.MouseEvent) => void;
        onUpdate?: (data: TreeNodeDatum | TreeNodeDatum[]) => void;
        transitionDuration?: number;
        styles?: Record<string, unknown>;
    }

    const Tree: React.FC<TreeProps>;
    export default Tree;
}
