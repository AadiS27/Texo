'use client'
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, CodeIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon,  MessageSquarePlusIcon,  MinusIcon, PlusIcon, Printer, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react";
import{
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

import {type Level} from "@tiptap/extension-heading";
import{type ColorResult,CirclePicker} from "react-color";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ToolbarButtonProps{
 onClick?:()=>void;
 isActive?:boolean;
 icon:LucideIcon
}

const FontFamilyButton=()=>{
    const {editor}=useEditorStore();

    const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Impact", value: "Impact" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { label: "Palatino Linotype", value: "Palatino Linotype" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Garamond", value: "Garamond" },
    { label: "Arial Black", value: "Arial Black" },
    { label: "Bookman", value: "Bookman" },
    { label: "Candara", value: "Candara" },
    { label: "Franklin Gothic Medium", value: "Franklin Gothic Medium" },
    { label: "Gill Sans", value: "Gill Sans" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Lucida Bright", value: "Lucida Bright" },
    { label: "Segoe UI", value: "Segoe UI" },
    { label: "Courier", value: "Courier" },
    { label: "Lucida Sans", value: "Lucida Sans" },
    { label: "Monaco", value: "Monaco" },
    { label: "Optima", value: "Optima" },
    { label: "Brush Script MT", value: "Brush Script MT" },
    { label: "Futura", value: "Futura" },
    { label: "Baskerville", value: "Baskerville" },
    { label: "Didot", value: "Didot" },
    { label: "Rockwell", value: "Rockwell" },
];

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button
            className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
                <span className="truncate">
                {editor?.getAttributes("textStyle").fontFamily||"Arial"}
                </span>
                <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="pl-1 flex flex-col gap-y-1 max-h-60 max-w-30 overflow-y-auto">
            {fonts.map(({label,value})=>(
            <button
            onClick={()=> editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm font-[value] hover:bg-secondary",
                editor?.getAttributes("textStyle").fontFamily===value&&"bg-secondary"
            )}
            style={{fontFamily:value}}>
                <span className="text-sm">{label}</span>
            </button>
            ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const TextColorButton=()=>{
    const {editor}=useEditorStore();

    const value=editor?.getAttributes("textStyle").color||"#000000";
    const onChange=(color:ColorResult)=>{
        editor?.chain().focus().setColor(color.hex).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button title="Text Color" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
                <span className="text-xs">A</span>
                <div className="h-0.5 w-full" style={{backgroundColor:value}}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                <CirclePicker 
                color={value}
               onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const ListButton=()=>{
    const {editor}=useEditorStore();

    const list=[
        {label:"Bullet List",
        icon:ListIcon,
        isActive:()=>editor?.isActive("bulletList"),
        onClick:()=>editor?.chain().focus().toggleBulletList().run(),
        },
        {label:"Ordered List",
            icon:ListOrderedIcon,
            isActive:()=>editor?.isActive("orderedList"),
            onClick:()=>editor?.chain().focus().toggleOrderedList().run(),
            },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button title="List" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
               <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
              {list.map(({label,icon:Icon,isActive,onClick})=>(
                    <button
                    onClick={onClick}
                    key={label}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-secondary",
                        isActive()&&"bg-secondary"
                    )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const FontSizeButton=()=>{
    const {editor}=useEditorStore();
    const currentFontSize=editor?.getAttributes("textStyle").fontSize
    ?editor?.getAttributes("textStyle").fontSize.replace("px","")
    :"16";

    const [fontSize,setFontSize]=useState(currentFontSize);
    const [inputValue,setInputValue]=useState(fontSize);
    const [isEditing,setIsEditing]=useState(false);

    const updateFontSize=(newSize:string)=>{
        const size=parseInt(newSize);
        if(!isNaN(size)&&size>0){
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    };

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value);
    };

    const handleInputBlur=()=>{
        updateFontSize(inputValue);
    }

    const handleInputKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Enter"){
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }
    const increment=()=>{
        const newSize=parseInt(fontSize)+1;
        updateFontSize(newSize.toString());
    }
    const decrement=()=>{
        const newSize=parseInt(fontSize)-1;
        if(newSize>0){
        updateFontSize(newSize.toString());
    }
}
    
    return (
       <div className="flex items-center gap-x-0.5">
       <button 
        onClick={decrement}
       className="h-7  w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-secondary ">
        <MinusIcon className="size-4" />
       </button>
       {isEditing?(
           <input
           type="text"
           value={inputValue}
           onChange={handleInputChange}
           onBlur={handleInputBlur}
           onKeyDown={handleInputKeyDown}
           className="h-7  w-10 text-sm text-center border-2 border-netural-400 rounded-sm bg-background focus:outline-none focus:ring-0"/>
        ):(
            <button onClick={()=>{setIsEditing(true);
                setFontSize(currentFontSize)}}
            className="h-7  w-10 text-sm border-2  text-center border-netural-800 rounded-sm bg-background cursor-text">
                {currentFontSize}
            </button>)}
            <button 
        onClick={increment}
       className="h-7  w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-secondary ">
        <PlusIcon className="size-4" />
       </button>
       </div>
    )
}
const AlignButton=()=>{
    const {editor}=useEditorStore();

    const alignments=[
        {label:"Left",value:"left",icon:AlignLeftIcon},
        {label:"Center",value:"center",icon:AlignCenterIcon},
        {label:"Right",value:"right",icon:AlignRightIcon},
        {label:"Justify",value:"justify",icon:AlignJustifyIcon},
    ];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button title="Align" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
               <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
              {alignments.map(({label,value,icon:Icon})=>(
                    <button
                    onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
                    key={value}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-secondary",
                        editor?.isActive({textAlign:value})&&"bg-secondary"
                    )}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const LineHeightButton=()=>{
    const {editor}=useEditorStore();

    const LineHeights=[
       {label:"default",value:"normal"},
       {label:"Single",value:"1"},
         {label:"1.15",value:"1.15"},
            {label:"1.5",value:"1.5"},
       {label:"Double",value:"2"},
    ];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button title="Line Height" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
               <ListCollapseIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
              {LineHeights.map(({label,value})=>(
                    <button
                    onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
                    key={value}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-secondary",
                        editor?.getAttributes("paragraph").lineHeight===value&&"bg-secondary"
                    )}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const HighlightColorButton=()=>{
    const {editor}=useEditorStore();

   
    const onChange=(color:ColorResult)=>{
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button title="Highlight" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
               <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                <CirclePicker 
                
               onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const HeadingLevelButton=()=>{
    const {editor}=useEditorStore();

    const headings=[
        {label:"Normal Text",value:0,fontSize:"16px"},
        {label:"Heading 1",value:1,fontSize:"32px"},
        {label:"Heading 2",value:2,fontSize:"24px"},
        {label:"Heading 3",value:3,fontSize:"20px"},
        {label:"Heading 4",value:4,fontSize:"18px"},
        {label:"Heading 5",value:5,fontSize:"16px"},


    ];

    const getCurrentHeading=()=>{
        for(let level=1;level<=5;level++){
            if(editor?.isActive("heading",{level})){
                return `Heading ${level}`;
            }
        }
        return "Normal Text";
    }
    return(
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button
            className="h-7 w-[120px] min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
                <span className="truncate">
                {getCurrentHeading()}
                </span>
                <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {headings.map(({label,value,fontSize})=>(
                <button
                onClick={()=>{
                    if (value===0){
                        editor?.chain().focus().setParagraph().run();
                }else{
                    editor?.chain().focus().toggleHeading({level:value as Level}).run();
                }
            }}
                key={value}
                style={{ fontSize }}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1 rounded-sm font-[value] hover:bg-secondary",
                    (value===0 && !editor?.isActive("heading"))||editor?.isActive("heading",{level:value})&&"bg-secondary"
                )}
                >
                    {label}
                </button>
            ))}


            </DropdownMenuContent>
       </DropdownMenu>
    )
}

const LinkButton=()=>{
    const {editor}=useEditorStore();
    const[value,setValue]=useState(editor?.getAttributes("link").href||"");
    const onChange=(href:string)=>{
     editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
     setValue("");
    };
    return (
        <DropdownMenu onOpenChange={(open)=>{
            if(open){
                setValue(editor?.getAttributes("link").href||"");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button title="Link" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
               <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input 
                placeholder="https://example.com"
                value={value}
                onChange={(e)=>setValue(e.target.value)}/>
                <Button onClick={()=>onChange(value)}>
                Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}
const ImageButton=()=>{
    const {editor}=useEditorStore();
    const [isDialogOpen,setIsDialogOpen]=useState(false);
    const[imageUrl,setImageUrl]=useState("");
    const onChange=(src:string)=>{
     editor?.chain().focus().setImage({src}).run();
    };

    const onUpload=()=>{
        const input  = document.createElement("input");
        input.type="file";
        input.accept="image/*";

        input.onchange=(e)=>{
        const file=(e.target as HTMLInputElement).files?.[0];
        if(file){
            const imageUrl=URL.createObjectURL(file);
            onChange(imageUrl);
        }
    }
    input.click();
    }

    const handleImageUrlSubmit=()=>{
        if(imageUrl){
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button title="Image" className="h-7  min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-secondary px-1.5 overflow-hidden text-sm">
               <ImageIcon className="size-4"  />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
            <DropdownMenuItem onClick={onUpload}>
                <UploadIcon className="size-4 mr-2"/>
                Upload
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setIsDialogOpen(true)}>
                <SearchIcon className="size-4 mr-2"/>
                Paste Image Url
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Paste Image Url
                    </DialogTitle>
                </DialogHeader>
                <Input
                placeholder="Insert Image Url"
                value={imageUrl}
                onChange={(e)=>setImageUrl(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                        handleImageUrlSubmit();
                    }
                }}
                />
            <DialogFooter>
                <Button onClick={handleImageUrlSubmit}>
                   Insert
                </Button>
            </DialogFooter>
            </DialogContent>
            
        </Dialog>
        </>
    )
}

const ToolbarButton=({
    onClick,
    isActive,
    icon:Icon,
}:ToolbarButtonProps)=>{
    return(
        <button onClick={onClick}
        className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-secondary",
            isActive && "bg-background/80"
        )}>
            <Icon className="size-4"/>
        </button>
    )

}

export const Toolbar = () => {
    const {editor}=useEditorStore();
    const sections:{
        label:string;
        icon:LucideIcon;
        onClick:()=>void;
        isActive?:boolean;
    }[][]=[
        [
            {
                label:"Undo",
                icon:Undo2Icon,
                onClick:()=>editor?.chain().focus().undo().run(),
            },
            {
                label:"Redo",
                icon:Redo2Icon,
                onClick:()=>editor?.chain().focus().redo().run(),
            },
            {
                label:"Print",
                icon:Printer,
                onClick:()=>window.print(),
            },
            {
                label:"SpellCheck",
                icon:SpellCheckIcon,
                onClick:()=>{
                   const current = editor?.view.dom.getAttribute("spellcheck");
                     editor?.view.dom.setAttribute("spellcheck",current==="false"?"true":"false");
                    },
            },
        ],
        [
            {
                label:"Bold",
                icon:BoldIcon,
                isActive:editor?.isActive("bold"),
                onClick:()=>editor?.chain().focus().toggleBold().run(),
            },
            {
                label:"Italic",
                icon:ItalicIcon,
                isActive:editor?.isActive("italic"),
                onClick:()=>editor?.chain().focus().toggleItalic().run(),
            },
            {
                label:"Underline",
                icon:UnderlineIcon,
                isActive:editor?.isActive("underline"),
                onClick:()=>editor?.chain().focus().toggleUnderline().run(),
            },
           
        ],
            [
                {
                    label:"Codeblock",
                    icon:CodeIcon,
                    isActive:editor?.isActive("codeBlock"),
                    onClick:()=>editor?.chain().focus().toggleCodeBlock().run(),
                },
            {
                label:"Comments",
                icon:MessageSquarePlusIcon,
                onClick:()=>editor?.chain().focus().addPendingComment().run(),
                isActive:editor?.isActive("liveblocksCommentMark"),
            },
            {
                label:"List Todo",
                icon:ListTodoIcon,
                onClick:()=>editor?.chain().focus().toggleTaskList().run(),
                isActive:editor?.isActive("taskList"),
            },
            {
                label:"Remove Formatting",
                icon:RemoveFormattingIcon,
                onClick:()=>editor?.chain().focus().unsetAllMarks().run(),
            },
        
        ],
    ];
    return (
        <div className="bg-card px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
           {sections[0].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
        ))}
        <Separator orientation="vertical" className="h-6 bg-background"/>
       <FontFamilyButton />
        <Separator orientation="vertical" className="h-6 bg-background"/>
        <HeadingLevelButton/>
        <Separator orientation="vertical" className="h-6 bg-background"/>
       <FontSizeButton/>
        <Separator orientation="vertical" className="h-6 bg-background"/>
        {sections[1].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
        ))}
        <TextColorButton/>
        <HighlightColorButton/>
        <Separator orientation="vertical" className="h-6 bg-background"/>
        <LinkButton/>
        <ImageButton/>
        <AlignButton />
        <LineHeightButton/>
        <ListButton/>
        {sections[2].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
        ))}
        </div>
    )
}