{
  description = "Node.js development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_22
          pnpm # swap for `yarn`, or drop it and use the bundled npm
          typescript-language-server
        ];

        shellHook = ''
          # npm's global prefix, kept inside the project. Without this,
          # `npm i -g` tries to write into the store and fails.
          export NPM_CONFIG_PREFIX="$PWD/.npm-global"
          export PATH="$NPM_CONFIG_PREFIX/bin:$PATH"
        '';
      };
    };
}