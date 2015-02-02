###-begin-nks-completion-###
#
# nks command completion script
#
# Installation: npm-kludge-search --completion >> ~/.bashrc  
# Or, maybe: npm-kludge-search --completion > /usr/local/etc/bash_completion.d/nks
#

COMP_WORDBREAKS=${COMP_WORDBREAKS/=/}
COMP_WORDBREAKS=${COMP_WORDBREAKS/@/}
export COMP_WORDBREAKS

if type complete &>/dev/null; then
  _nks_completion () {
    local si="$IFS"
    IFS=$'\n' COMPREPLY=($(COMP_CWORD="$COMP_CWORD" \
                           COMP_LINE="$COMP_LINE" \
                           COMP_POINT="$COMP_POINT" \
                           npm-kludge-search --complete "$2" \
                           2>/dev/null)) || return $?
    IFS="$si"
  }
  complete -F _nks_completion ni
fi

alias ni="npm install"
###-end-nks-completion-###
