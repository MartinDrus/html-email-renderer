import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Command zum Starten der Vorschau registrieren
	const disposable = vscode.commands.registerCommand('html-email-renderer.previewEmail', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}

		const document = editor.document;
		const text = document.getText();

		// Suche nach einem Template Literal, das <!DOCTYPE html> enthält
		const htmlTemplate = extractHtmlFromTemplate(text);

		if (!htmlTemplate) {
			vscode.window.showErrorMessage('No valid HTML template found.');
			return;
		}

		// Extrahiere das Variablenobjekt, falls vorhanden
		const variables = extractOrderObj(text);

		// HTML mit den Variablen rendern
		const renderedHtml = renderHtmlWithVariables(htmlTemplate, variables);

		// Webview öffnen und HTML anzeigen
		const panel = vscode.window.createWebviewPanel(
			'htmlEmailPreview',
			'HTML Email Preview',
			vscode.ViewColumn.Beside,
			{ enableScripts: true }
		);

		panel.webview.html = renderedHtml;
	});

	context.subscriptions.push(disposable);
}

// Extrahiere HTML aus einem Template Literal
function extractHtmlFromTemplate(text: string): string | null {
	const match = text.match(/`([\s\S]*?<!DOCTYPE html>[\s\S]*?)`/);
	return match ? match[1] : null;
}

// Extrahiere ein beliebiges Objekt aus dem Code
function extractOrderObj(text: string): Record<string, any> {
	const match = text.match(/const\s+(\w+)\s*=\s*(\{[\s\S]*?\});/);

	if (match && match[2]) {
		try {
			// JSON-ähnlichen Text in ein Objekt konvertieren
			return eval(`(${match[2]})`);
		} catch (e) {
			vscode.window.showErrorMessage('Failed to parse the variable object.');
		}
	}

	return {};
}

// Rendern von HTML mit Variablen
function renderHtmlWithVariables(template: string, variables: Record<string, any> = {}): string {
	return template.replace(/\$\{(.*?)\}/g, (_, key) => {
		const keys = key.split('.').map((k: string) => k.trim());
		let value: any = variables;

		keys.forEach((k: string) => value = value ? value[k] : undefined);

		return value !== undefined ? value : `<span style="color:red;">[Missing: ${key}]</span>`;
	});
}

export function deactivate() { }
