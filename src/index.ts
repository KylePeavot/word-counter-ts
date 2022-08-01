import textTranscripts from './resources/text-transcripts.json';
import fs from 'fs';

type Transcript = {
    url: string;
    transcriptText: string;
};

function run() {
    const allTranscriptText: string = textTranscripts
        .map((transcript: Transcript) => transcript.transcriptText)
        .reduce(
            (previousValue, currentValue) => previousValue + ' ' + currentValue,
        );

    const sanitisedTranscriptText = allTranscriptText
        .replace(/[!,.?'"()0-9]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .toLowerCase();

    const wordsInTranscriptArray: string[] = sanitisedTranscriptText.split(' ');

    let wordsInTranscriptHashMap = new Map<string, number>(); //this isn't really a HashMap, I just like to pretend I'm writing Java

    wordsInTranscriptArray.forEach((word: string) => {
        if (wordsInTranscriptHashMap.has(word)) {
            wordsInTranscriptHashMap.set(
                word,
                wordsInTranscriptHashMap.get(word)! + 1,
            );
        } else {
            wordsInTranscriptHashMap.set(word, 1);
        }
    });

    const sortedWordsInTranscriptAsCSV: string = [
        ...wordsInTranscriptHashMap.entries(),
    ]
        .sort((firstWord, secondWord) => firstWord[1] - secondWord[1])
        .map(sortedWord => `${sortedWord[0]}; ${sortedWord[1]}`)
        .join('\n');


    fs.writeFile(`most-common-spanish-words-${new Date().toISOString()}.csv`, sortedWordsInTranscriptAsCSV, () => {});
}

run();
