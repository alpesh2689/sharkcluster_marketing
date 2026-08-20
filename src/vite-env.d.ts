/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** SharkCluster backend base URL — serves /get/blogs and /get_api_docs. */
  readonly VITE_API_URL?: string;
  /** RAG chatbot endpoint base URL. When unset, the assistant widget stays hidden. */
  readonly VITE_CHATBOT_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
