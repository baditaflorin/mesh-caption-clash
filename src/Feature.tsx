import { useState } from "react";
import { useSharedCaptionContest } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };

export function Feature({ room, config }: Props) {
  const contest = useSharedCaptionContest(room);
  const [prompt, setPrompt] = useState("");
  const [caption, setCaption] = useState("");
  return (
    <main className="creative-app caption-app">
      <p className="eyebrow">Write once. Vote honestly.</p>
      <h1>Caption Clash</h1>
      <p className="lede">Set a scene, submit one caption, then pick the funniest peer entry.</p>
      {contest.prompt ? (
        <h2 className="prompt">“{contest.prompt}”</h2>
      ) : (
        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            if (contest.setPrompt(prompt)) setPrompt("");
          }}
        >
          <label className="sr-only" htmlFor="prompt">
            Contest prompt
          </label>
          <input
            id="prompt"
            maxLength={280}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Set the scene…"
            value={prompt}
          />
          <button disabled={!prompt.trim() || !room} type="submit">
            Set prompt
          </button>
        </form>
      )}
      {contest.prompt ? (
        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            if (contest.submit(caption)) setCaption("");
          }}
        >
          <label className="sr-only" htmlFor="caption">
            Your caption
          </label>
          <input
            id="caption"
            maxLength={280}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Write your caption…"
            value={caption}
          />
          <button disabled={!caption.trim() || !room} type="submit">
            Submit caption
          </button>
        </form>
      ) : null}
      <section aria-label="Caption entries" className="caption-list">
        {contest.captions.map((entry) => (
          <article className="caption" key={entry.peerId}>
            <p>{entry.text}</p>
            <button
              aria-pressed={entry.voterIds.includes(room?.peerId ?? "")}
              disabled={entry.peerId === room?.peerId}
              type="button"
              onClick={() => contest.toggleVote(entry.peerId)}
            >
              ♥ {entry.votes}
            </button>
          </article>
        ))}
      </section>
      {contest.prompt ? (
        <button className="subtle" type="button" onClick={contest.reset}>
          Start a new clash
        </button>
      ) : null}
      <p aria-live="polite" className="status">
        {room
          ? `${contest.captions.length} caption${contest.captions.length === 1 ? "" : "s"} submitted`
          : config.description}
      </p>
    </main>
  );
}
