interface ParsedCommand {
    command: string;
    args: string[];
}

const parseCommand = (input: string): ParsedCommand => {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    return { command, args };
};

export default parseCommand;