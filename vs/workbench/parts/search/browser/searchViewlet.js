/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spiffcode, Inc. All rights reserved.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function s(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(s.prototype=t.prototype,new s)},__decorate=this&&this.__decorate||function(e,t,s,i){var r,n=arguments.length,o=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,s,o):r(t,s))||o);return n>3&&o&&Object.defineProperty(t,s,o),o},__param=this&&this.__param||function(e,t){return function(s,i){t(s,i,e)}};define(["require","exports","vs/nls","vs/base/common/winjs.base","vs/editor/common/editorCommon","vs/base/common/lifecycle","vs/base/common/errors","vs/base/browser/ui/aria/aria","vs/base/common/types","vs/base/common/strings","vs/base/browser/dom","vs/base/browser/keyboardEvent","vs/base/browser/builder","vs/base/browser/ui/findinput/findInput","vs/base/parts/tree/browser/treeImpl","vs/workbench/common/memento","vs/workbench/common/events","vs/workbench/services/group/common/groupService","vs/workbench/common/editor","vs/platform/files/common/files","vs/workbench/browser/viewlet","vs/workbench/parts/search/common/searchModel","vs/workbench/parts/search/common/searchQuery","vs/workbench/parts/search/common/constants","vs/base/browser/ui/inputbox/inputBox","vs/workbench/services/editor/common/editorService","vs/platform/storage/common/storage","vs/platform/configuration/common/configuration","vs/platform/contextview/browser/contextView","vs/platform/event/common/event","vs/platform/instantiation/common/instantiation","vs/platform/message/common/message","vs/platform/search/common/search","vs/platform/progress/common/progress","vs/platform/workspace/common/workspace","vs/platform/keybinding/common/keybinding","vs/platform/telemetry/common/telemetry","vs/base/common/keyCodes","vs/workbench/parts/search/browser/patternInputWidget","vs/workbench/parts/search/browser/searchResultsView","vs/workbench/parts/search/browser/searchWidget","vs/workbench/parts/search/browser/searchActions","vs/workbench/parts/search/common/replace","vs/base/common/severity","vs/css!./media/searchviewlet"],function(e,t,s,i,r,n,o,a,c,l,h,u,d,p,v,g,f,m,y,S,w,b,E,R,C,x,P,I,W,M,_,T,A,F,k,V,L,O,U,q,z,G,N,D){"use strict";var K=function(e){function t(t,s,i,r,n,o,a,c,l,h,u,d,p,v){var m=this;e.call(this,R.VIEWLET_ID,t),this.eventService=s,this.editorService=i,this.editorGroupService=r,this.progressService=n,this.messageService=o,this.storageService=a,this.contextViewService=c,this.instantiationService=l,this.configurationService=h,this.contextService=u,this.searchService=d,this.keybindingService=p,this.replaceService=v,this.toDispose=[],this.viewletVisible=p.createKey("searchViewletVisible",!0),this.callOnModelChange=[],this.queryBuilder=this.instantiationService.createInstance(E.QueryBuilder),this.viewletSettings=this.getMemento(a,g.Scope.WORKSPACE),this.toUnbind.push(this.eventService.addListener2(S.EventType.FILE_CHANGES,function(e){return m.onFilesChanged(e)})),this.toUnbind.push(this.eventService.addListener2(f.EventType.UNTITLED_FILE_SAVED,function(e){return m.onUntitledFileSaved(e)})),this.toUnbind.push(this.configurationService.onDidUpdateConfiguration(function(e){return m.onConfigurationUpdated(e.config)}))}return __extends(t,e),t.prototype.onConfigurationUpdated=function(e){this.updateGlobalPatternExclusions(e)},t.prototype.create=function(t){var r=this;e.prototype.create.call(this,t),this.viewModel=this.instantiationService.createInstance(b.SearchModel);var n;this.domNode=t.div({"class":"search-viewlet"},function(e){n=e}),n.div({"class":["search-widgets-container"]},function(e){r.searchWidgetsContainer=e}),this.createSearchWidget(this.searchWidgetsContainer);var o=this.viewletSettings["query.filePatterns"]||"",a=this.viewletSettings["query.folderExclusions"]||"",c=this.viewletSettings["query.exclusionsUsePattern"],l=this.viewletSettings["query.includesUsePattern"],v=this.viewletSettings["query.folderIncludes"]||"",g=function(e){e.keyCode===O.KeyCode.Enter?r.onQueryChanged(!0):e.keyCode===O.KeyCode.Escape&&r.cancelSearch()};this.queryDetails=this.searchWidgetsContainer.div({"class":["query-details"]},function(e){e.div({"class":"file-types"},function(e){var t=s.localize("searchScope.includes","files to include");e.element("h4",{text:t}),r.inputPatternIncludes=new U.PatternInputWidget(e.getContainer(),r.contextViewService,{ariaLabel:s.localize("label.includes","Search Include Patterns")}),r.inputPatternIncludes.setIsGlobPattern(l),r.inputPatternIncludes.setValue(v),r.inputPatternIncludes.on(h.EventType.KEY_UP,g).on(h.EventType.KEY_DOWN,function(e){var t=new u.StandardKeyboardEvent(e);t.equals(O.CommonKeybindings.UP_ARROW)?(h.EventHelper.stop(e),r.searchWidget.focus(!0,!0)):t.equals(O.CommonKeybindings.DOWN_ARROW)&&(h.EventHelper.stop(e),r.inputPatternExclusions.focus(),r.inputPatternExclusions.select())}).on(p.FindInput.OPTION_CHANGE,function(e){r.onQueryChanged(!1)}),r.inputPatternIncludes.onSubmit(function(){return r.onQueryChanged(!0)})}),e.div({"class":"file-types"},function(e){var t=s.localize("searchScope.excludes","files to exclude");e.element("h4",{text:t}),r.inputPatternExclusions=new U.PatternInputWidget(e.getContainer(),r.contextViewService,{ariaLabel:s.localize("label.excludes","Search Exclude Patterns")}),r.inputPatternExclusions.setIsGlobPattern(c),r.inputPatternExclusions.setValue(a),r.inputPatternExclusions.on(h.EventType.KEY_UP,g).on(h.EventType.KEY_DOWN,function(e){var t=new u.StandardKeyboardEvent(e);t.equals(O.CommonKeybindings.UP_ARROW)?(h.EventHelper.stop(e),r.inputPatternIncludes.focus(),r.inputPatternIncludes.select()):t.equals(O.CommonKeybindings.DOWN_ARROW)&&(h.EventHelper.stop(e),r.selectTreeIfNotSelected())}).on(p.FindInput.OPTION_CHANGE,function(e){r.onQueryChanged(!1)}),r.inputPatternExclusions.onSubmit(function(){return r.onQueryChanged(!0)})}),r.inputPatternGlobalExclusionsContainer=e.div({"class":"file-types global-exclude disabled"},function(e){var t=s.localize("global.searchScope.folders","files excluded through settings");e.element("h4",{text:t}),r.inputPatternGlobalExclusions=new C.InputBox(e.getContainer(),r.contextViewService,{actions:[r.instantiationService.createInstance(G.ConfigureGlobalExclusionsAction)],ariaLabel:s.localize("label.global.excludes","Configured Search Exclude Patterns")}),r.inputPatternGlobalExclusions.inputElement.readOnly=!0,d.$(r.inputPatternGlobalExclusions.inputElement).attr("aria-readonly","true"),d.$(r.inputPatternGlobalExclusions.inputElement).addClass("disabled")}).hide()}).getHTMLElement(),h.addClass(this.queryDetails,"more"),this.toggleFileTypes(),h.removeClass(this.queryDetails,"more"),this.messages=n.div({"class":"messages"}).hide().clone(),this.createSearchResultsView(n),this.actionRegistry={};var f=[new G.CollapseAllAction(this),new G.RefreshAction(this),new G.ClearSearchResultsAction(this)];return f.forEach(function(e){r.actionRegistry[e.id]=e}),""===o&&""===a&&""===v||this.toggleFileTypes(!0,!0,!0),this.updateGlobalPatternExclusions(this.configurationService.getConfiguration()),this.toUnbind.push(this.viewModel.searchResult.onChange(function(e){return r.onSearchResultsChanged(e)})),i.TPromise.as(null)},Object.defineProperty(t.prototype,"searchAndReplaceWidget",{get:function(){return this.searchWidget},enumerable:!0,configurable:!0}),t.prototype.createSearchWidget=function(e){var s=this,i=this.viewletSettings["query.contentPattern"]||"",r=this.viewletSettings["query.regex"]===!0,n=this.viewletSettings["query.wholeWords"]===!0,o=this.viewletSettings["query.caseSensitive"]===!0;this.searchWidget=new z.SearchWidget(e,this.contextViewService,{value:i,isRegex:r,isCaseSensitive:o,isWholeWords:n},this.keybindingService,this.instantiationService),this.storageService.getBoolean(t.SHOW_REPLACE_STORAGE_KEY,P.StorageScope.WORKSPACE,!0)&&this.searchWidget.toggleReplace(!0),this.toUnbind.push(this.searchWidget),this.toUnbind.push(this.searchWidget.onSearchSubmit(function(e){return s.onQueryChanged(e)})),this.toUnbind.push(this.searchWidget.onSearchCancel(function(){return s.cancelSearch()})),this.toUnbind.push(this.searchWidget.searchInput.onDidOptionChange(function(e){return s.onQueryChanged(!0,e)})),this.toUnbind.push(this.searchWidget.onReplaceToggled(function(){return s.onReplaceToggled()})),this.toUnbind.push(this.searchWidget.onReplaceStateChange(function(e){s.viewModel.replaceActive=e,s.tree.refresh()})),this.toUnbind.push(this.searchWidget.onReplaceValueChanged(function(e){s.viewModel.replaceString=s.searchWidget.getReplaceValue(),s.refreshInputs(),s.tree.refresh()})),this.toUnbind.push(this.searchWidget.onKeyDownArrow(function(){s.showsFileTypes()?s.toggleFileTypes(!0,s.showsFileTypes()):s.selectTreeIfNotSelected()})),this.toUnbind.push(this.searchWidget.onReplaceAll(function(){return s.replaceAll()}))},t.prototype.onReplaceToggled=function(){this.layout(this.size),this.storageService.store(t.SHOW_REPLACE_STORAGE_KEY,this.searchAndReplaceWidget.isReplaceShown(),P.StorageScope.WORKSPACE)},t.prototype.onSearchResultsChanged=function(e){var t=this;return this.refreshTree(e).then(function(){t.searchWidget.setReplaceAllActionState(!t.viewModel.searchResult.isEmpty())})},t.prototype.refreshTree=function(e){var t=this;return e?e.added||e.removed?this.tree.refresh(this.viewModel.searchResult).then(function(){e.added&&e.elements.forEach(function(e){t.autoExpandFileMatch(e,!0)})}):1===e.elements.length?this.tree.refresh(e.elements[0]):this.tree.refresh(e.elements):this.tree.refresh(this.viewModel.searchResult)},t.prototype.refreshInputs=function(){var e=this;this.viewModel.searchResult.matches().forEach(function(t){e.replaceService.refreshInput(t)})},t.prototype.replaceAll=function(){var e=this;if(0!==this.viewModel.searchResult.count()){var t=this.progressService.show(100),i=this.viewModel.searchResult.count(),r=this.viewModel.searchResult.fileCount(),n=this.searchWidget.getReplaceValue()||"",a=n?s.localize("replaceAll.message","Replaced {0} occurrences across {1} files with {2}.",i,r,n):s.localize("removeAll.message","Removed {0} occurrences across {1} files.",i,r),c={title:s.localize("replaceAll.confirmation.title","Replace All"),message:n?s.localize("replaceAll.confirmation.message","Replace {0} occurrences across {1} files with '{2}'?",i,r,n):s.localize("removeAll.confirmation.message","Remove {0} occurrences across {1} files?",i,r),primaryButton:s.localize("replaceAll.confirm.button","Replace")};this.messageService.confirm(c)&&(this.searchWidget.setReplaceAllActionState(!1),this.viewModel.searchResult.replaceAll(t).then(function(){t.done(),e.showMessage(a)},function(s){t.done(),o.isPromiseCanceledError(s),e.messageService.show(D["default"].Error,s)}))}},t.prototype.showMessage=function(e){return this.messages.empty().show().asContainer().div({"class":"message",text:e})},t.prototype.createSearchResultsView=function(e){var t=this;e.div({"class":"results"},function(e){t.results=e;var i=new q.SearchDataSource,r=t.instantiationService.createInstance(q.SearchRenderer,t.getActionRunner(),t);t.tree=new v.Tree(e.getHTMLElement(),{dataSource:i,renderer:r,sorter:new q.SearchSorter,filter:new q.SearchFilter,controller:new q.SearchController(t,t.instantiationService),accessibilityProvider:t.instantiationService.createInstance(q.SearchAccessibilityProvider)},{ariaLabel:s.localize("treeAriaLabel","Search Results")}),t.tree.setInput(t.viewModel.searchResult),t.toUnbind.push(r),t.toUnbind.push(t.tree.addListener2("selection",function(e){var s,i=e.payload&&"keyboard"===e.payload.origin;s=i?t.tree.getFocus():e.selection[0];var r=e.payload&&e.payload.originalEvent,n=e.payload&&"mouse"===e.payload.origin&&r&&2===r.detail;n&&r.preventDefault();var o=r&&(r.ctrlKey||r.metaKey),a=i&&r.keyCode===O.KeyCode.Enter||n;if(s instanceof b.Match){var c=s;t.currentSelectedFileMatch&&t.currentSelectedFileMatch.setSelectedMatch(null),t.currentSelectedFileMatch=c.parent(),t.currentSelectedFileMatch.setSelectedMatch(c),t.onFocus(c,!a,o,n)}}))})},t.prototype.updateGlobalPatternExclusions=function(e){if(this.inputPatternGlobalExclusionsContainer){var t=E.getExcludes(e);if(t){var i=Object.getOwnPropertyNames(t).filter(function(e){return t[e]===!0||"string"==typeof t[e].when}).map(function(e){return t[e]===!0?e:s.localize("globLabel","{0} when {1}",e,t[e].when)});if(i.length){var r=i.join(", ");this.inputPatternGlobalExclusions.value=r,this.inputPatternGlobalExclusions.inputElement.title=r,this.inputPatternGlobalExclusionsContainer.show()}else this.inputPatternGlobalExclusionsContainer.hide()}}},t.prototype.setVisible=function(t){var s;if(this.viewletVisible.set(t),t?(s=e.prototype.setVisible.call(this,t),this.tree.onVisible()):(this.tree.onHidden(),s=e.prototype.setVisible.call(this,t)),this.viewModel&&this.viewModel.searchResult.toggleHighlights(t),t&&!this.editorService.getActiveEditor()){var i=this.tree.getFocus();i&&this.onFocus(i)}return s},t.prototype.focus=function(){e.prototype.focus.call(this);var t=this.getSearchTextFromEditor();t&&this.searchWidget.searchInput.setValue(t),this.searchWidget.focus()},t.prototype.moveFocusFromResults=function(){this.showsFileTypes()?this.toggleFileTypes(!0,!0,!1,!0):this.searchWidget.focus(!0,!0)},t.prototype.reLayout=function(){if(!this.isDisposed){this.searchWidget.setWidth(this.size.width-25),this.inputPatternExclusions.setWidth(this.size.width-28),this.inputPatternIncludes.setWidth(this.size.width-28),this.inputPatternGlobalExclusions.width=this.size.width-28-24;var e=this.size.height-h.getTotalHeight(this.searchWidgetsContainer.getContainer())-6;this.results.style({height:e+"px"}),this.tree.layout(e)}},t.prototype.layout=function(e){this.size=e,this.reLayout()},t.prototype.getControl=function(){return this.tree},t.prototype.clearSearchResults=function(){this.viewModel.searchResult.clear(),this.showEmptyStage(),this.searchWidget.clear(),this.viewModel.cancelSearch()},t.prototype.cancelSearch=function(){return!!this.viewModel.cancelSearch()&&(this.searchWidget.focus(),!0)},t.prototype.selectTreeIfNotSelected=function(){if(this.tree.getInput()){this.tree.DOMFocus();var e=this.tree.getSelection();0===e.length&&this.tree.focusNext()}},t.prototype.getSearchTextFromEditor=function(){if(!this.editorService.getActiveEditor())return null;var e=this.editorService.getActiveEditor().getControl();if(!e||!c.isFunction(e.getEditorType)||e.getEditorType()!==r.EditorType.ICodeEditor)return null;var t=e.getSelection();if(t&&!t.isEmpty()&&t.startLineNumber===t.endLineNumber){var s=e.getModel().getLineContent(t.startLineNumber);return s=s.substring(t.startColumn-1,t.endColumn-1)}return null},t.prototype.showsFileTypes=function(){return h.hasClass(this.queryDetails,"more")},t.prototype.toggleFileTypes=function(e,t,s,i){var r="more";t="undefined"==typeof t?!h.hasClass(this.queryDetails,r):Boolean(t),s=Boolean(s),t?(h.addClass(this.queryDetails,r),e&&(i?(this.inputPatternExclusions.focus(),this.inputPatternExclusions.select()):(this.inputPatternIncludes.focus(),this.inputPatternIncludes.select()))):(h.removeClass(this.queryDetails,r),e&&this.searchWidget.focus()),!s&&this.size&&this.layout(this.size)},t.prototype.searchInFolder=function(e){this.showsFileTypes()||this.toggleFileTypes(!0,!0);var t=this.contextService.toWorkspaceRelativePath(e);t&&(this.inputPatternIncludes.setIsGlobPattern(!1),this.inputPatternIncludes.setValue(t),this.searchWidget.focus(!1))},t.prototype.onQueryChanged=function(e,s){var i=this.searchWidget.searchInput.getRegex(),r=this.searchWidget.searchInput.getWholeWords(),n=this.searchWidget.searchInput.getCaseSensitive(),o=this.searchWidget.searchInput.getValue(),a=this.inputPatternExclusions.getValue().trim(),c=this.inputPatternExclusions.isGlobPattern(),h=this.inputPatternIncludes.getValue().trim(),u=this.inputPatternIncludes.isGlobPattern();if(this.viewletSettings["query.contentPattern"]=o,this.viewletSettings["query.regex"]=i,this.viewletSettings["query.wholeWords"]=r,this.viewletSettings["query.caseSensitive"]=n,this.viewletSettings["query.folderExclusions"]=a,this.viewletSettings["query.exclusionsUsePattern"]=c,this.viewletSettings["query.folderIncludes"]=h,this.viewletSettings["query.includesUsePattern"]=u,e&&0!==o.length){if(i){var d=void 0;try{d=new RegExp(o)}catch(p){return}if(l.regExpLeadsToEndlessLoop(d))return}var v={pattern:o,isRegExp:i,isCaseSensitive:n,isWordMatch:r},g=this.inputPatternExclusions.getGlob(),f=this.inputPatternIncludes.getGlob(),m={folderResources:this.contextService.getWorkspace()?[this.contextService.getWorkspace().resource]:[],extraFileResources:y.getOutOfWorkspaceEditorResources(this.editorGroupService,this.contextService),excludePattern:g,maxResults:t.MAX_TEXT_RESULTS,includePattern:f};this.onQueryTriggered(this.queryBuilder.text(v,m),a,h),s||this.searchWidget.focus(!1)}},t.prototype.autoExpandFileMatch=function(e,t){var s=e.matches().length;s<10||t&&1===this.viewModel.searchResult.count()&&s<50?this.tree.expand(e).done(null,o.onUnexpectedError):this.tree.collapse(e).done(null,o.onUnexpectedError)},t.prototype.onQueryTriggered=function(e,t,i){var r=this;this.viewModel.cancelSearch();var n=100,c=this.progressService.show(n),l=0;this.loading=!0,this.searchWidget.searchInput.clearMessage(),this.showEmptyStage();var u=Object.create(null),p=function(e){var t=r.viewModel.searchResult.matches();t.forEach(function(t){u[t.id()]||(u[t.id()]=!0,r.autoExpandFileMatch(t,e))})},v=!1,g=function(e){v=!0,e?(c.worked(n-l),setTimeout(function(){return c.done()},200)):c.done(),r.onSearchResultsChanged().then(function(){return p(!0)}),r.viewModel.replaceString=r.searchWidget.getReplaceValue();var o=!r.viewModel.searchResult.isEmpty();if(r.loading=!1,r.actionRegistry.refresh.enabled=!0,r.actionRegistry["vs.tree.collapse"].enabled=o,r.actionRegistry.clearSearchResults.enabled=o,e&&e.limitHit&&r.searchWidget.searchInput.showMessage({content:s.localize("searchMaxResultsWarning","The result set only contains a subset of all matches. Please be more specific in your search to narrow down the results."),type:C.MessageType.WARNING}),o)r.viewModel.searchResult.toggleHighlights(!0),a.status(s.localize("ariaSearchResultsStatus","Search returned {0} results in {1} files",r.viewModel.searchResult.count(),r.viewModel.searchResult.fileCount()));else{var u=!!t,g=!!i,f=void 0;f=e?g&&u?s.localize("noResultsIncludesExcludes","No results found in '{0}' excluding '{1}' - ",i,t):g?s.localize("noResultsIncludes","No results found in '{0}' - ",i):u?s.localize("noResultsExcludes","No results found excluding '{0}' - ",t):s.localize("noResultsFound","No results found."):s.localize("searchCanceled","Search was canceled before any results could be found - "),a.status(f),r.tree.onHidden(),r.results.hide();var m=r.showMessage(f);e?(g||u)&&d.$(m).a({"class":["pointer","prominent"],tabindex:"0",text:s.localize("rerunSearchInAll.message","Search again in all files")}).on(h.EventType.CLICK,function(e){h.EventHelper.stop(e,!1),r.inputPatternExclusions.setValue(""),r.inputPatternIncludes.setValue(""),r.onQueryChanged(!0)}):d.$(m).a({"class":["pointer","prominent"],text:s.localize("rerunSearch.message","Search again")}).on(h.EventType.CLICK,function(e){h.EventHelper.stop(e,!1),r.onQueryChanged(!0)})}},f=function(e){o.isPromiseCanceledError(e)?g(null):(r.loading=!1,v=!0,c.done(),r.messageService.show(2,e))},m=0,y=0,S=0,w=function(e){e.total&&(m=e.total),e.worked&&(y=e.worked)},b=setInterval(function(){if(v)return void window.clearInterval(b);var e=!0;if(m>0&&y>0){var t=Math.round(y/m*100);t>l&&(c.worked(t-l),l=t,e=!1)}e&&l<90&&(l++,c.worked(1));var s=r.viewModel.searchResult.fileCount();S!==s&&(S=s,r.tree.refresh().then(function(){p(!1)}).done(null,o.onUnexpectedError)),s>0&&(r.actionRegistry["vs.tree.collapse"].enabled||(r.actionRegistry["vs.tree.collapse"].enabled=!0))},200);this.searchWidget.setReplaceAllActionState(!1),this.replaceService.disposeAllInputs(),this.viewModel.search(e).done(g,f,w)},t.prototype.showEmptyStage=function(){this.actionRegistry.refresh.enabled=!1,this.actionRegistry["vs.tree.collapse"].enabled=!1,this.actionRegistry.clearSearchResults.enabled=!1,this.replaceService.disposeAllInputs(),this.messages.hide(),this.results.show(),this.tree.onVisible(),this.currentSelectedFileMatch=null},t.prototype.onFocus=function(e,t,s,r){return e instanceof b.Match?(this.telemetryService.publicLog("searchResultChosen"),this.viewModel.isReplaceActive()&&this.viewModel.replaceString?this.replaceService.openReplacePreviewEditor(e,t,s,r):this.open(e,t,s,r)):i.TPromise.as(!0)},t.prototype.open=function(e,t,s,i){var r=this.getSelectionFrom(e),n=e instanceof b.Match?e.parent().resource():e.resource();return this.editorService.openEditor({resource:n,options:{preserveFocus:t,pinned:i,selection:r,revealIfVisible:!0}},s)},t.prototype.getSelectionFrom=function(e){var t=null;if(e instanceof b.Match&&(t=e),e instanceof b.FileMatch&&e.count()>0&&(t=e.matches()[e.matches().length-1]),t){var s=t.range();if(this.viewModel.isReplaceActive()){var i=t.replaceString;return{startLineNumber:s.startLineNumber,startColumn:s.startColumn+i.length,endLineNumber:s.startLineNumber,endColumn:s.startColumn+i.length}}return s}},t.prototype.onUntitledFileSaved=function(e){if(this.viewModel)for(var t=this.viewModel.searchResult.matches(),s=0,i=t.length;s<i;s++)e.resource.toString()===t[s].resource().toString()&&this.viewModel.searchResult.remove(t[s])},t.prototype.onFilesChanged=function(e){if(this.viewModel)for(var t=this.viewModel.searchResult.matches(),s=0,i=t.length;s<i;s++)e.contains(t[s].resource(),S.FileChangeType.DELETED)&&this.viewModel.searchResult.remove(t[s])},t.prototype.getActions=function(){return[this.actionRegistry.refresh,this.actionRegistry["vs.tree.collapse"],this.actionRegistry.clearSearchResults]},t.prototype.dispose=function(){this.isDisposed=!0,this.toDispose=n.dispose(this.toDispose),this.tree&&this.tree.dispose(),this.searchWidget.dispose(),this.inputPatternIncludes.dispose(),this.inputPatternExclusions.dispose(),this.viewModel.dispose(),e.prototype.dispose.call(this)},t.MAX_TEXT_RESULTS=2048,t.SHOW_REPLACE_STORAGE_KEY="vs.search.show.replace",t=__decorate([__param(0,L.ITelemetryService),__param(1,M.IEventService),__param(2,x.IWorkbenchEditorService),__param(3,m.IEditorGroupService),__param(4,F.IProgressService),__param(5,T.IMessageService),__param(6,P.IStorageService),__param(7,W.IContextViewService),__param(8,_.IInstantiationService),__param(9,I.IConfigurationService),__param(10,k.IWorkspaceContextService),__param(11,A.ISearchService),__param(12,V.IKeybindingService),__param(13,N.IReplaceService)],t)}(w.Viewlet);t.SearchViewlet=K});