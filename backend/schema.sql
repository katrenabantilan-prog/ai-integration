
CREATE SCHEMA IF NOT EXISTS ai;

-- 4. Ensure objects created below go into "ai"
SET search_path TO ai, public;


-- Users -----------------------------------------------------
CREATE TABLE ai.users (
  id             SERIAL PRIMARY KEY,
  email          VARCHAR(255) UNIQUE NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  role           VARCHAR(20) NOT NULL DEFAULT 'user'
                 CHECK (role IN ('user', 'admin')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Conversations --------------------------------------------
CREATE TABLE ai.conversations (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL
              REFERENCES ai.users(id) ON DELETE CASCADE,
  title       VARCHAR(255) NOT NULL DEFAULT 'New Chat',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Messages --------------------------------------------------
CREATE TABLE ai.messages (
  id               SERIAL PRIMARY KEY,
  conversation_id  INTEGER NOT NULL
                   REFERENCES ai.conversations(id) ON DELETE CASCADE,
  role             VARCHAR(20) NOT NULL
                   CHECK (role IN ('user', 'assistant', 'system')),
  content          TEXT NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Saved outputs --------------------------------------------
CREATE TABLE ai.saved_outputs (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL
              REFERENCES ai.users(id) ON DELETE CASCADE,
  label       VARCHAR(255) NOT NULL DEFAULT 'Saved Output',
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



CREATE INDEX idx_conversations_user      ON ai.conversations(user_id);
CREATE INDEX idx_conversations_updated   ON ai.conversations(updated_at DESC);
CREATE INDEX idx_messages_conversation   ON ai.messages(conversation_id);
CREATE INDEX idx_saved_outputs_user      ON ai.saved_outputs(user_id);



CREATE OR REPLACE FUNCTION ai.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_conversations_updated
BEFORE UPDATE ON ai.conversations
FOR EACH ROW EXECUTE FUNCTION ai.set_updated_at();


ALTER DATABASE ai_integration SET search_path TO ai, public;

