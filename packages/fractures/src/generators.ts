import chalk from "chalk";
import { FractureBreakpoints } from "fractures-library/types/css-rules";
import type {
	FractureRuleType,
	FractureFiles,
} from "fractures-library/types/css-rules";
import { writeFile } from "./utils";

// Generates all the rules for the declarations
export const generateRules = (
	fractureRule: FractureRuleType,
	prefix?: string
): string => {
	console.log(
		chalk.gray(
			`    | rules for ${prefix ? prefix + ":" : ""}${
				fractureRule.selector
			}`
		)
	);

	const declarations: Array<[string, string]> = Object.entries(
		fractureRule.declarations
	);
	const hasMultipleDeclarations: boolean = declarations.length > 1;
	const declarationSpace: string = hasMultipleDeclarations ? "\n" : "";
	const declarationOutput: string = declarations
		.map((prop) => {
			const property: string = prop[0].replace(
				/[A-Z]/g,
				(letter) => `-${letter.toLowerCase()}`
			);

			return `${property}: ${prop[1]};`;
		})
		.join(declarationSpace);

	const rule: string = `${fractureRule.selector} {${declarationSpace}${declarationOutput}${declarationSpace}}\n`;

	return `.${prefix ? `${prefix}\\:` : ""}${rule}`;
};

export const generateResponsiveRules = (
	fractureFiles: FractureFiles
): string => {
	let css: string = "";
	const responsiveRules: Array<FractureRuleType> = Object.values(
		fractureFiles
	)
		.flatMap((x) => x)
		.filter((rule) => rule.hasBreakpoints);

	// Rules for each breakpoint enum
	const breakPointsEntries = Object.entries(FractureBreakpoints);

	for (const value of breakPointsEntries) {
		css += `
			@media (max-width: ${value[1]}) {
				${responsiveRules.map((rule) => generateRules(rule, value[0])).join("")}
			}`;
	}

	return css;
};

export const generateNormalRules = (
	fractureFiles: FractureFiles,
	prefix?: string
): string => {
	let css: string = "";

	for (const [, value] of Object.entries(fractureFiles)) {
		value.forEach((rule: FractureRuleType) => {
			css += generateRules(rule);
			if (!!prefix) css += generateRules(rule, prefix);
		});
	}

	return css;
};

// Generates a new fractures file
export const generateOutput = (
	files: FractureFiles,
	init: string,
	folder: string,
	isMinified?: boolean
) => {
	console.log(
		chalk.bold.green(`⤓ Fractures — folder: ${folder} min: ${!!isMinified}`)
	);
	const css: string = `
		${init}
		${generateNormalRules(files, "hover")}
		${generateResponsiveRules(files)}
	`;
	const fractures: string = isMinified ? css.replace(/\s/g, "") : css;

	return writeFile(folder, fractures);
};
