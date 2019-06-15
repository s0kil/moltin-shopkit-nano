import { h as html } from "stage0";

import PoweredBy from "../PoweredBy";

const View = html`
  <div></div>
`;

export default function Footer() {
  const root = View;

  const poweredBy = PoweredBy();
  root.appendChild(poweredBy);

  return root;
}
