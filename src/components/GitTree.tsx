import React from "react";
import styled from "styled-components";

interface GitTreeProps {
    currentBranch: string;
    branches: string[];
}

const TreeContainer = styled.div`
    font-family: monospace;
    margin-top: 20px;
`;

const Branch = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    margin: 5px 0;
    color: ${props => props.isActive ? '#27C93F' : 'white'};
    font-weight: ${props => props.isActive ? 'bold' : 'normal'};
`;

const Circle = styled.span<{ isActive: boolean }>`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: ${props => props.isActive ? '#27C93F' : '#4169E1'};
`;

const GitTree: React.FC<GitTreeProps> = ({ currentBranch, branches }) => {
    return (
        <TreeContainer>
            {branches.map((branch, index) => {
                const isActive = branch === currentBranch;
                const isLast = index === branches.length - 1;

                return (
                    <Branch key={branch} isActive={isActive}>
                        {index > 0 && <span style={{ marginRight: '8px' }}>{isLast ? '└──' : '├──'}</span>}
                        <Circle isActive={isActive} />
                        <span>{branch}</span>
                        {isActive && <span> (active)</span>}
                    </Branch>
                );
            })}
        </TreeContainer>
    );
};

export default GitTree;