declare const numberEls: HTMLDivElement[];
declare const incrementEl: HTMLButtonElement;
interface Game {
    name: "LearnTS";
    number1: number;
    number2: number;
    startTime: number;
    lastTime: number;
}
declare const defaultGame: Game;
declare const game: Game;
interface ManageSaveSaveOptions {
    type: "save";
    game: Game;
    key: string;
}
interface ManageSaveLoadOptions {
    type: "load";
    target: Game;
    key: string;
}
declare type ManageSaveActionOptions = ManageSaveSaveOptions | ManageSaveLoadOptions;
declare function manageSave(action: ManageSaveActionOptions): void;
declare function isGame(data: any): data is Game;
declare function tick(): void;
declare function render(): void;
//# sourceMappingURL=index.d.ts.map