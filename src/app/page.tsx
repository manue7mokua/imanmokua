// src/app/page.tsx
"use client";

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Terminal from '../components/Terminal';
import GitTree from '../components/GitTree';
import commandHandler from '../utils/commandHandler';
import { AppState, CommandResult } from '../types';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #1E1E1E;
    color: white;
    font-family: monospace;
`;

const Header = styled.header`
    background-color: #333;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
`;

const TerminalWrapper = styled.div`
    flex: 2;
    padding: 10px;
`;

const VisualizationPanel = styled.div`
    flex: 1;
    padding: 10px;
    background-color: #252526;
    display: flex;
    flex-direction: column;
`;

const TreeVisualization = styled.div`
    flex: 2;
    border: 1px solid #444;
    margin-bottom: 10px;
    padding: 10px;
`;

const CommandReference = styled.div`
    flex: 1;
    border: 1px solid #444;
    padding: 10px;
`;

interface TerminalOutput {
    input: string;
    output: string | CommandResult;
}

export default function Home() {
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [commandOutput, setCommandOutput] = useState<string[]>([
        "Welcome to Iman's interactive portfolio!",
        'Type "help" to see available commands.'
    ]);
    
    const [appState, setAppState] = useState<AppState>({
        currentBranch: 'main',
        branches: ['main', 'projects', 'blog', 'awards'],
    });

    const handleBranchClick = useCallback((branch: string) => {
        if (branch === appState.currentBranch) return;

        // Add command to history and execute it
        const command = `git checkout ${branch}`;
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);

        setCommandOutput(prev => [...prev, `$ ${command}`]);
        setAppState(prev => ({ ...prev, currentBranch: branch }));
        setCommandOutput(prev => [
            ...prev,
            `Switched to branch '${branch}'`
        ]);
    }, [appState.currentBranch]);
    
    const handleCommand = useCallback((command: string) => {
        // Add to history
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);
        
        // First, add the command to the output
        setCommandOutput(prev => [...prev, `$ ${command}`]);
        
        // Process command
        const result = commandHandler(command, appState, setAppState);
        
        // Handle output
        if (typeof result === 'object' && result.clear) {
            // Reset to initial welcome messages
            setCommandOutput([
                "Welcome to Iman's interactive portfolio!",
                'Type "help" to see available commands'
            ]);
            return
        }
        // Then add the result
        setCommandOutput(prev => [
            ...prev, 
            `$ ${command}`,
            typeof result === 'string' ? result : result.output || ''
        ]);
    }, [appState]);
    
    return (
      <AppContainer>
        <Header>
          <span>Portfolio Terminal - emmanuel@portfolio:~/{appState.currentBranch}</span>
          <div>
              <span style={{ margin: '0 5px', color: '#FF5F56' }}>●</span>
              <span style={{ margin: '0 5px', color: '#FFBD2E' }}>●</span>
              <span style={{ margin: '0 5px', color: '#27C93F' }}>●</span>
          </div>
        </Header>
        <MainContent>
          <TerminalWrapper>
            <Terminal 
                onCommand={handleCommand} 
                history={commandHistory}
                historyIndex={historyIndex}
                setHistoryIndex={setHistoryIndex}
                commandOutput={commandOutput}
            />
          </TerminalWrapper>
          <VisualizationPanel>
            <TreeVisualization>
              <h3>Repository Structure</h3>
              <GitTree 
                  currentBranch={appState.currentBranch} 
                  branches={appState.branches} 
                  onBranchClick={handleBranchClick}
              />
            </TreeVisualization>
            <CommandReference>
                <h3>Available Commands</h3>
                <div>git checkout [branch]</div>
                <div>git branch</div>
                <div>ls</div>
                <div>cat [file.md]</div>
                <div>social [platform]</div>
                <div>open [project]</div>
                <div>help</div>
                <div>clear</div>
            </CommandReference>
          </VisualizationPanel>
        </MainContent>
      </AppContainer>
    );
}