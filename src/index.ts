import textTranscripts from './resources/text-transcripts.json';

//get all text from json file and put it in a string
//sanitise string of all punctuation
//make a record<string, string>
//for each word, if record<s,s> contains the word, increment
//               if not contain, add word

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

    console.log(allTranscriptText.substring(0, 200));
}

run();